import { React, useState, useEffect } from 'react'
import AxiosInstance from './Axios'  // 匯入自定義的 Axios 實例，用來處理 HTTP 請求
import MyPieChart from './charts/PieChart'  // 匯入自定義派圖組件
import MyChartBox from './charts/ChartBox'  // 匯入自定義圖表盒組件
import StoreIcon from '@mui/icons-material/Store'  // 匯入 Material-UI 圖標
import MyDonutChart from './charts/DonutChart'  // 匯入自定義環狀圖組件
import WcIcon from '@mui/icons-material/Wc'  // 匯入性別圖標
import MyStackedBarChart from './charts/StackedBarChart'  // 匯入自定義堆疊柱狀圖組件
import CategoryIcon from '@mui/icons-material/Category'  // 匯入分類圖標
import MyChartBox2 from './charts/ChartBox2'  // 匯入另一種自定義圖表盒組件
import MyLineChart from './charts/LineChart'  // 匯入自定義折線圖組件
import PublicIcon from '@mui/icons-material/Public'  // 匯入地球圖標
import MyCombiChart from './charts/CombiChart'  // 匯入自定義組合圖表組件

// Dashboard1 組件：展示多個圖表並從 API 獲取資料
const Dashboard1 = () => {

    // 使用 useState 建立狀態，用來儲存從 API 獲取的資料
    const [myBrancheData, setMyBrancheData] = useState([])
    const [myGenderData, setMyGenderData] = useState([])
    const [MyProductBrancheData, setMyProductBrancheData] = useState([])
    const [myCountryData, setMyCountryData] = useState([])

    // 用來測試產品分行資料是否正確
    console.log("My Productbranche Data", MyProductBrancheData)

    // 從後端 API 獲取資料的函數
    const GetData = () => {
        // 獲取分行數據
        AxiosInstance.get(`branchedata/`)
        .then((res) => {
            setMyBrancheData(res.data)
        })

        // 獲取性別數據
        AxiosInstance.get(`genderdata/`)
        .then((res) => {
            setMyGenderData(res.data)
        })

        // 獲取產品分行數據
        AxiosInstance.get(`productbranchedata/`)
        .then((res) => {
            setMyProductBrancheData(res.data)
        })

        // 獲取國家數據
        AxiosInstance.get(`countrydata/`)
        .then((res) => {
            setMyCountryData(res.data)
        })
    }

    // 使用 useEffect 在組件首次渲染時呼叫 GetData 來獲取資料
    useEffect(() => {
        GetData()
    }, [])

    // 設定分行資料的系列，用於堆疊柱狀圖
    const myseries = [
        { dataKey: 'quantityBrancheA', label: 'Branche A', stack: "A" }, 
        { dataKey: 'quantityBrancheB', label: 'Branche B', stack: "A" }, 
        { dataKey: 'quantityBrancheC', label: 'Branche C', stack: "A" }, 
    ]

    // 設定國家資料的系列，用於折線圖
    const mycountryseries = [
        { dataKey: 'quantityNetherlands', label: 'Netherlands' }, 
        { dataKey: 'quantityGermany', label: 'Germany' }, 
        { dataKey: 'quantityFrance', label: 'France' }, 
    ]

    // 設定產品分行資料的系列，用於組合圖表
    const myproductbrancheseries = [
        { dataKey: 'quantityBrancheA', label: 'Quantity Branche A', type: 'bar' }, 
        { dataKey: 'quantityBrancheB', label: 'Quantity Branche B', type: 'line' }, 
        { dataKey: 'quantityBrancheC', label: 'Quantity Branche C', type: 'line' }, 
    ]

    // 渲染 Dashboard 組件，展示多個圖表盒
    return (
        <div>
            <MyChartBox
                icon1={<StoreIcon />}
                title1={"Quantities per Branch"}
                chart1={<MyPieChart myData={myBrancheData} />}

                icon2={<WcIcon />}
                title2={"Quantities per Gender"}
                chart2={<MyDonutChart
                            data={myGenderData}
                            centerlabel={myGenderData.reduce((sum, data) => sum + data.value, 0)}
                        />}

                icon3={<CategoryIcon />}
                title3={"Quantities per Productline & Branche"}
                chart3={<MyStackedBarChart
                            dataset={MyProductBrancheData}
                            XlabelName={'productline__name'}
                            series={myseries}
                        />}
            />

            <MyChartBox2
                icon1={<PublicIcon />}
                title1={"Quantities per Month per Country"}
                chart1={<MyLineChart
                            mydata={myCountryData}
                            myxaxis={"month_name"}
                            myseries={mycountryseries}
                        />}

                icon2={<PublicIcon />}
                title2={"Quantities per Product Line per Branch"}
                chart2={<MyCombiChart
                            data={MyProductBrancheData}
                            myseries={myproductbrancheseries}
                            xcolumn={'productline__name'}
                        />}
            />
        </div>
    )
}

export default Dashboard1
