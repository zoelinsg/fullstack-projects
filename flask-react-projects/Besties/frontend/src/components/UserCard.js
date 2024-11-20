import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from "@chakra-ui/react";  // 引入 Chakra UI 元件
import { BiTrash } from "react-icons/bi";  // 引入 Trash（垃圾桶）圖示
import EditModal from "./EditModal";  // 引入編輯用戶資料的模態框元件
import { BASE_URL } from "../App";  // 引入 API 基本路徑

// 定義 UserCard 元件，用來顯示單個用戶資料的卡片
const UserCard = ({ user, setUsers }) => {
	const toast = useToast();  // Chakra UI 的提示工具，用來顯示成功或錯誤訊息

	// 處理刪除用戶的函式
	const handleDeleteUser = async () => {
		try {
			// 發送 DELETE 請求來刪除用戶
			const res = await fetch(BASE_URL + "/friends/" + user.id, {
				method: "DELETE",  // 設置請求方法為 DELETE
			});
			const data = await res.json();  // 將回應轉換為 JSON 格式
			if (!res.ok) {
				throw new Error(data.error);  // 如果回應有錯誤，拋出錯誤訊息
			}
			// 刪除成功後，更新用戶列表
			setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));  // 從用戶列表中移除已刪除的用戶

			// 顯示刪除成功提示
			toast({
				status: "success",  // 設置狀態為成功
				title: "Success",   // 提示標題
				description: "Friend deleted successfully.",  // 提示描述
				duration: 2000,  // 提示持續時間 2 秒
				position: "top-center",  // 提示顯示位置
			});
		} catch (error) {
			// 如果發生錯誤，顯示錯誤提示
			toast({
				title: "An error occurred",  // 錯誤提示標題
				description: error.message,  // 錯誤訊息內容
				status: "error",  // 設置狀態為錯誤
				duration: 4000,  // 提示持續時間 4 秒
				isClosable: true,  // 設置提示可以被關閉
				position: "top-center",  // 提示顯示位置
			});
		}
	};

	// 返回卡片 UI，顯示用戶的資料及操作按鈕
	return (
		<Card>
			<CardHeader>
				<Flex gap={4}>
					{/* 左側：顯示用戶頭像和基本資料 */}
					<Flex flex={"1"} gap={"4"} alignItems={"center"}>
						<Avatar src={user.imgUrl} />  {/* 用戶頭像 */}

						<Box>
							<Heading size='sm'>{user.name}</Heading>  {/* 用戶名稱 */}
							<Text>{user.role}</Text>  {/* 用戶職位 */}
						</Box>
					</Flex>

					{/* 右側：顯示編輯和刪除按鈕 */}
					<Flex>
						{/* 編輯用戶資料的模態框按鈕 */}
						<EditModal user={user} setUsers={setUsers} />  
						{/* 刪除用戶的垃圾桶按鈕 */}
						<IconButton
							variant='ghost'  // 按鈕樣式設置為透明
							colorScheme='red'  // 設置按鈕顏色為紅色
							size={"sm"}  // 設置按鈕大小為小型
							aria-label='Delete user'  // 按鈕的無障礙標籤
							icon={<BiTrash size={20} />}  // 設置按鈕圖示為垃圾桶
							onClick={handleDeleteUser}  // 點擊按鈕時觸發刪除用戶的函式
						/>
					</Flex>
				</Flex>
			</CardHeader>

			{/* 卡片主體：顯示用戶的描述 */}
			<CardBody>
				<Text>{user.description}</Text>
			</CardBody>
		</Card>
	);
};

export default UserCard;
