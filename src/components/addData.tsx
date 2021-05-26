const data: number[][] = [...Array(47)].map((_, i) => [i + 1]) // 都道府県毎の人口データ

interface value {
    year: number
    value: number
}

const addData = async (prefId: number): Promise<number[]> => {
    if (data[prefId - 1].length == 1) {
        const result = await fetch('./api/resas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prefId),
        })

        let prefData: value[] | undefined
        await result.json().then((population) => {
            if (population.statusCode == 403) {
                alert('APIキーが無効です')
            } else if (population.statusCode == 429) {
                alert(
                    'APIリクエスト制限です。申し訳ございませんが、しばらく待ってからもう一度お試しください。',
                )
            }
            try {
                prefData = population.result.data[0].data
            } catch (e) {
                prefData = undefined //エラー時処理
            }
        })

        if (prefData) {
            data[prefId - 1] = prefData.map((data: value) => data.value) // [data1, data2 ... dataN]の形にする
        }
    }
    return data[prefId - 1]
}

export default addData
