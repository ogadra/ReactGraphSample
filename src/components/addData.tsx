const data: any[][] = [...Array(47)].map((_, i) => [String(i + 1)]) // 都道府県毎の人口データ

const addData = async (prefId: number) => {
    if (data[prefId - 1].length == 1) {
        const result = await fetch('./api/resas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prefId),
        })

        const prefData = await result
            .json()
            .then((population) => population.result.data[0].data)
        console.log(result)
        data[prefId - 1] = prefData.map((data: any) => data.value) // [data1, data2 ... dataN]の形にする
    }
    return data[prefId - 1]
}

export default addData
