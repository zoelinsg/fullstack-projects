import React, { useState, useEffect } from 'react'; // 引入 React 和 hooks
import { Container, Stack, Text } from "@chakra-ui/react"; // 引入 Chakra UI 元件
import Navbar from "./components/Navbar"; // 引入自定義的 Navbar 元件
import UserGrid from "./components/UserGrid"; // 引入自定義的 UserGrid 元件

// 將 BASE_URL 定義並導出，根據環境變數來決定 API 的基本 URL
export const BASE_URL = process.env.NODE_ENV === "development" ? "http://127.0.0.1:5000/api" : "/api";

function App() {
	const [users, setUsers] = useState([]); // 定義狀態來保存使用者資料

	// 使用 useEffect 在組件掛載時從 API 獲取使用者資料
	useEffect(() => {
		async function fetchUsers() {
			try {
				const response = await fetch(`${BASE_URL}/users`); // 從 API 獲取資料
				const data = await response.json(); // 將回應轉換為 JSON 格式
				setUsers(data); // 將獲取到的使用者資料設置為狀態
			} catch (error) {
				console.error("Error fetching users:", error); // 錯誤處理
			}
		}
		fetchUsers(); // 調用獲取資料的函數
	}, []); // 空依賴數組，表示只在組件初次渲染時執行一次

	return (
		<Stack minH={"100vh"}> {/* 使用 Stack 來建立垂直佈局，minH 設置為 100vh */}
			<Navbar setUsers={setUsers} /> {/* 傳遞 setUsers 給 Navbar */}

			<Container maxW={"1200px"} my={4}> {/* 設置最大寬度和外邊距 */}
				<Text
					fontSize={{ base: "3xl", md: "50" }}  // 動態設置字體大小
					fontWeight={"bold"}  // 字體加粗
					letterSpacing={"2px"}  // 設置字母之間的間距
					textTransform={"uppercase"}  // 文字轉為大寫
					textAlign={"center"}  // 文字置中
					mb={8}  // 底部外邊距
				>
					<Text as={"span"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}> {/* 漸層文字效果 */}
						My Besties  {/* 文字內容 */}
					</Text>
					🚀 {/* 火箭 emoji */}
				</Text>

				{/* 使用 UserGrid 組件顯示使用者列表 */}
				<UserGrid users={users} setUsers={setUsers} />
			</Container>
		</Stack>
	);
}

export default App; // 將 App 元件導出
