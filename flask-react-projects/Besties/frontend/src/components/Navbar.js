import { Box, Button, Container, Flex, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";  // 引入 Chakra UI 元件
import { IoMoon } from "react-icons/io5";  // 引入 Moon 圖示
import { LuSun } from "react-icons/lu";    // 引入 Sun 圖示
import CreateUserModal from "./CreateUserModal";  // 引入自定義的 CreateUserModal 元件

// 定義 Navbar 元件，並將 setUsers 作為屬性傳入
const Navbar = ({ setUsers }) => {
	const { colorMode, toggleColorMode } = useColorMode();  // Chakra UI 提供的 hook，用來切換深色和淺色模式

	return (
		<Container maxW={"900px"}>  {/* 設定最大寬度為 900px */}
			<Box px={4} my={4} borderRadius={5} bg={useColorModeValue("gray.200", "gray.700")}>  {/* 根據當前模式設置背景顏色 */}
				<Flex h='16' alignItems={"center"} justifyContent={"space-between"}>  {/* 設置 Flex 容器，用於左右佈局 */}
					
					{/* 左側內容 */}
					<Flex
						alignItems={"center"}
						justifyContent={"center"}
						gap={3}  // 設定項目之間的間隔
						display={{ base: "none", sm: "flex" }}  // 在小於 `sm` 尺寸時隱藏
					>
						{/* 顯示 React 和 Python 圖片，並加入符號以模擬加法 */}
						<img src='/react.png' alt='React logo' width={50} height={50} />
						<Text fontSize={"40px"}>+</Text>
						<img src='/python.png' alt='Python logo' width={50} height={40} />
						<Text fontSize={"40px"}>=</Text>
						<img src='/explode.png' alt='Explode head' width={45} height={45} />
					</Flex>

					{/* 右側內容 */}
					<Flex gap={3} alignItems={"center"}>  {/* 設置右側內容與項目間的間隔 */}
						<Text fontSize={"lg"} fontWeight={500} display={{ base: "none", md: "block" }}>  {/* 在大於 `md` 尺寸時顯示文字 */}
							BFFship 🔥  {/* 文字顯示為 "BFFship 🔥" */}
						</Text>

						{/* 切換深色或淺色模式的按鈕 */}
						<Button onClick={toggleColorMode}>
							{/* 根據當前模式顯示不同圖示 */}
							{colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
						</Button>

						{/* 創建新用戶的按鈕 */}
						<CreateUserModal setUsers={setUsers} />  {/* 將 setUsers 傳給 CreateUserModal 用來更新使用者列表 */}
					</Flex>
				</Flex>
			</Box>
		</Container>
	);
};

export default Navbar;
