import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from "../App";  // 從 App.js 中引入 BASE_URL，用於 API 請求

// 定義 EditModal 元件，用來編輯使用者資料
function EditModal({ setUsers, user }) {
	const { isOpen, onOpen, onClose } = useDisclosure();  // Chakra UI 的 hook，用來控制模態框的開關狀態
	const [isLoading, setIsLoading] = useState(false);    // 用來顯示按鈕的加載狀態
	const [inputs, setInputs] = useState({
		name: user.name,           // 預設將用戶的現有資料放入表單
		role: user.role,
		description: user.description,
	});
	const toast = useToast();      // Chakra UI 的提示工具，用於顯示成功或錯誤訊息

	// 處理表單提交的函式
	const handleEditUser = async (e) => {
		e.preventDefault();        // 防止表單提交後頁面刷新
		setIsLoading(true);        // 設置按鈕為加載狀態
		try {
			const res = await fetch(BASE_URL + "/friends/" + user.id, {
				method: "PATCH",   // 使用 PATCH 方法來更新資料
				headers: {
					"Content-Type": "application/json",  // 定義傳送的資料類型為 JSON
				},
				body: JSON.stringify(inputs),  // 將使用者輸入的資料轉換為 JSON 格式
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);  // 如果回應不是 200 OK，拋出錯誤訊息
			}

			// 更新狀態中的使用者資料
			setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? data : u)));
			
			// 顯示成功提示
			toast({
				status: "success",
				title: "Yayy! 🎉",
				description: "Friend updated successfully.",
				duration: 2000,
				position: "top-center",
			});
			onClose();  // 關閉模態框
		} catch (error) {
			// 如果有錯誤，顯示錯誤提示
			toast({
				status: "error",
				title: "An error occurred.",
				description: error.message,
				duration: 4000,
				position: "top-center",
			});
		} finally {
			setIsLoading(false);  // 無論成功或失敗，都將按鈕設置為非加載狀態
		}
	};

	return (
		<>
			{/* 編輯按鈕，當被點擊時打開模態框 */}
			<IconButton
				onClick={onOpen}
				variant='ghost'
				colorScheme='blue'
				aria-label='Edit user'
				size={"sm"}
				icon={<BiEditAlt size={20} />}
			/>

			{/* 模態框內容 */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleEditUser}>
					<ModalContent>
						<ModalHeader>編輯好友資料 😍</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							{/* 名字和職位欄位 */}
							<Flex alignItems={"center"} gap={4}>
								<FormControl>
									<FormLabel>全名</FormLabel>
									<Input
										placeholder='John Doe'
										value={inputs.name}
										onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}
									/>
								</FormControl>

								<FormControl>
									<FormLabel>職位</FormLabel>
									<Input
										placeholder='Software Engineer'
										value={inputs.role}
										onChange={(e) => setInputs((prev) => ({ ...prev, role: e.target.value }))}
									/>
								</FormControl>
							</Flex>

							{/* 描述欄位 */}
							<FormControl mt={4}>
								<FormLabel>描述</FormLabel>
								<Textarea
									resize={"none"}
									overflowY={"hidden"}
									placeholder="他是一位熱愛編程並喜歡構建項目的軟體工程師。"
									value={inputs.description}
									onChange={(e) => setInputs((prev) => ({ ...prev, description: e.target.value }))}
								/>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
								更新
							</Button>
							<Button onClick={onClose}>取消</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
}

export default EditModal;
