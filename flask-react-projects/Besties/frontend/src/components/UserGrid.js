import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";  // 引入 Chakra UI 元件
import UserCard from "./UserCard";  // 引入自定義的 UserCard 元件
import { useEffect, useState } from "react";  // 引入 React 的 useEffect 和 useState hooks
import { BASE_URL } from "../App";  // 引入 API 基本路徑

// 定義 UserGrid 元件，用來顯示使用者卡片的網格佈局
const UserGrid = ({ users, setUsers }) => {
	const [isLoading, setIsLoading] = useState(true);  // 管理加載狀態，預設為 true 表示正在加載

	// 使用 useEffect 來在組件掛載時從後端獲取用戶資料
	useEffect(() => {
		const getUsers = async () => {
			try {
				// 發送 GET 請求獲取用戶資料
				const res = await fetch(BASE_URL + "/friends");
				const data = await res.json();

				// 如果請求失敗，拋出錯誤
				if (!res.ok) {
					throw new Error(data.error);
				}

				// 如果請求成功，更新 users 狀態
				setUsers(data);
			} catch (error) {
				// 打印錯誤到控制台
				console.error(error);
			} finally {
				// 無論成功或失敗，都將加載狀態設置為 false
				setIsLoading(false);
			}
		};

		// 調用 getUsers 函式來獲取資料
		getUsers();
	}, [setUsers]);  // 依賴於 setUsers，當 setUsers 改變時重新執行

	console.log(users);  // 在控制台打印 users 資料

	// 返回網格佈局，顯示用戶資料
	return (
		<>
			<Grid
				templateColumns={{
					base: "1fr",  // 在小螢幕時每行顯示 1 個卡片
					md: "repeat(2, 1fr)",  // 中等螢幕時每行顯示 2 個卡片
					lg: "repeat(3, 1fr)",  // 大螢幕時每行顯示 3 個卡片
				}}
				gap={4}  // 設置卡片之間的間距
			>
				{/* 根據 users 陣列動態生成 UserCard 元件 */}
				{users.map((user) => (
					<UserCard key={user.id} user={user} setUsers={setUsers} />  // 每個用戶顯示一個 UserCard
				))}
			</Grid>

			{/* 如果正在加載，顯示一個 Spinner 加載動畫 */}
			{isLoading && (
				<Flex justifyContent={"center"}>  {/* 將 Spinner 居中顯示 */}
					<Spinner size={"xl"} />  {/* 使用 Chakra UI 的 Spinner 元件，設置為大號 */}
				</Flex>
			)}

			{/* 如果加載完成且沒有找到用戶，顯示提示訊息 */}
			{!isLoading && users.length === 0 && (
				<Flex justifyContent={"center"}>  {/* 將提示訊息居中顯示 */}
					<Text fontSize={"xl"}>  {/* 設置字體大小 */}
						<Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
							Poor you! 🥺  {/* 顯示 "Poor you!" 的粗體字 */}
						</Text>
						No friends found.  {/* 顯示 "No friends found." 的提示 */}
					</Text>
				</Flex>
			)}
		</>
	);
};

export default UserGrid;
