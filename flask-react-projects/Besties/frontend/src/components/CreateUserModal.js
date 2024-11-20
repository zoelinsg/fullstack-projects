import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Radio,
	RadioGroup,
	Textarea,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from '../App';  // 確保 BASE_URL 已經正確定義

// 建立 CreateUserModal 元件，用於創建新用戶的模態框
const CreateUserModal = ({ setUsers }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();  // 使用 Chakra UI 的 useDisclosure 控制模態框開關
	const [isLoading, setIsLoading] = useState(false);    // 用來控制按鈕的加載狀態
	const [inputs, setInputs] = useState({
		name: "",         // 用戶名稱
		role: "",         // 用戶角色
		description: "",  // 用戶描述
		gender: "",       // 用戶性別
	});
	const toast = useToast();  // 使用 Chakra UI 的提示工具，用於顯示成功或錯誤訊息

	// 處理表單提交的函式
	const handleCreateUser = async (e) => {
		e.preventDefault(); // 防止頁面刷新
		setIsLoading(true);  // 開始加載狀態
		try {
			// 發送 POST 請求以創建新用戶
			const res = await fetch(BASE_URL + "/friends", {
				method: "POST",    // 請求方法為 POST
				headers: {
					"Content-Type": "application/json",  // 設定請求頭為 JSON
				},
				body: JSON.stringify(inputs),  // 將表單輸入的資料轉換為 JSON 格式
			});

			const data = await res.json();  // 將回應轉換為 JSON
			if (!res.ok) {  // 檢查是否回應有錯誤
				throw new Error(data.error);  // 如果有錯誤，拋出錯誤訊息
			}

			// 顯示成功提示
			toast({
				status: "success",  // 設定為成功狀態
				title: "Yayy! 🎉",
				description: "Friend created successfully.",  // 提示訊息內容
				duration: 2000,  // 提示持續 2 秒
				position: "top-center",  // 提示顯示位置
			});
			onClose();  // 成功後關閉模態框

			// 更新用戶列表狀態，將新創建的用戶加入列表
			setUsers((prevUsers) => [...prevUsers, data]);

			// 清空表單輸入
			setInputs({
				name: "",
				role: "",
				description: "",
				gender: "",
			});
		} catch (error) {
			// 如果發生錯誤，顯示錯誤提示
			toast({
				status: "error",
				title: "An error occurred.",  // 顯示錯誤訊息
				description: error.message,   // 錯誤訊息內容
				duration: 4000,  // 提示持續 4 秒
			});
		} finally {
			setIsLoading(false);  // 無論成功或失敗，都結束加載狀態
		}
	};

	return (
		<>
			{/* 顯示創建新用戶的按鈕 */}
			<Button onClick={onOpen}>
				<BiAddToQueue size={20} />  {/* 顯示圖示 */}
			</Button>

			{/* 模態框 */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />  {/* 模態框的覆蓋層 */}
				{/* 表單提交 */}
				<form onSubmit={handleCreateUser}>
					<ModalContent>
						<ModalHeader> My new BFF 😍 </ModalHeader>  {/* 模態框標題 */}
						<ModalCloseButton />  {/* 模態框關閉按鈕 */}

						<ModalBody pb={6}>
							<Flex alignItems={"center"} gap={4}>
								{/* 左側：輸入全名 */}
								<FormControl>
									<FormLabel>Full Name</FormLabel>
									<Input
										placeholder='John Doe'
										value={inputs.name}  // 綁定輸入值
										onChange={(e) => setInputs({ ...inputs, name: e.target.value })}  // 更新狀態
									/>
								</FormControl>

								{/* 右側：輸入職位 */}
								<FormControl>
									<FormLabel>Role</FormLabel>
									<Input
										placeholder='Software Engineer'
										value={inputs.role}  // 綁定輸入值
										onChange={(e) => setInputs({ ...inputs, role: e.target.value })}  // 更新狀態
									/>
								</FormControl>
							</Flex>

							{/* 輸入描述 */}
							<FormControl mt={4}>
								<FormLabel>Description</FormLabel>
								<Textarea
									resize={"none"}  // 禁止調整大小
									overflowY={"hidden"}  // 隱藏垂直滾動條
									placeholder="He's a software engineer who loves to code and build things."
									value={inputs.description}  // 綁定輸入值
									onChange={(e) => setInputs({ ...inputs, description: e.target.value })}  // 更新狀態
								/>
							</FormControl>

							{/* 性別選擇 */}
							<RadioGroup mt={4}>
								<Flex gap={5}>
									<Radio
										value='male'
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}  // 更新性別選擇
									>
										Male
									</Radio>
									<Radio
										value='female'
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}  // 更新性別選擇
									>
										Female
									</Radio>
								</Flex>
							</RadioGroup>
						</ModalBody>

						{/* 模態框底部按鈕 */}
						<ModalFooter>
							<Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
								Add  {/* 確認新增按鈕 */}
							</Button>
							<Button onClick={onClose}>Cancel</Button>  {/* 取消按鈕 */}
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
};

export default CreateUserModal;
