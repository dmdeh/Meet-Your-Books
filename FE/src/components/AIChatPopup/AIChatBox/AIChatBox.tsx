import { OpenAIOutlined, UserOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Text } from "@components/Common";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";

import { ChatHistory, Role } from "@/types/openAIType";
interface AIChatBoxProps {
    chatHistory: ChatHistory[];
    setHistory: Dispatch<SetStateAction<ChatHistory[]>>;
    ChatClose: () => void;
}

const AIChatBox = ({ chatHistory, setHistory, ChatClose }: AIChatBoxProps) => {
    const [inputValue, setInputValue] = useState("");
    const chatContentRef = useRef<HTMLDivElement | null>(null);
    const handleRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue) return;
        const message = inputValue
        setHistory((prev) => [...prev, { role: "user", content: message }]);
        setInputValue("")
        const response = await fetch("http://localhost:4000/openAI", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        setHistory((prev) => [
            ...prev,
            { role: "assistant", content: data.message },
        ]);
    };

    useEffect(() => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [setHistory]);

    return (
        <ChatBox>
            <ChatHeader>
                <Text color="white" fontWeight="bold">
                    AI 도서 추천받기
                </Text>
                <CloseButton onClick={ChatClose}>✕</CloseButton>
            </ChatHeader>
            <ChatContent ref={chatContentRef}>
                {chatHistory.map((message, idx) => (
                    <MessageWrapper key={idx} $isAI={message.role}>
                        {message.role === "assistant" ? (
                            <>
                                <OpenAIOutlined />
                                <MarkDownWrap remarkPlugins={[remarkGfm]}>
                                {message.content}
                                </MarkDownWrap>
                            </>
                        ) : (
                            <>
                                <Message $isAI={message.role}>
                                    {message.content}
                                </Message>
                                <UserOutlined />
                            </>
                        )}
                    </MessageWrapper>
                ))}
            </ChatContent>
            <ChatInputWrap onSubmit={handleRequest}>
                <ChatInput
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                />
                <SendButton
                    color="midnightBlue"
                    fontColor="white"
                    fontSize="sm"
                    type="submit"
                    disabled={!inputValue.trim()}
                >
                    <SendOutlined />
                </SendButton>
            </ChatInputWrap>
        </ChatBox>
    );
};

export default AIChatBox;

const ChatBox = styled.div`
    position: absolute;
    bottom: 70px;
    right: 0;
    width: 300px;
    height: 500px;
    background-color: #ffffff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 10000;
`;

const ChatHeader = styled.div`
    background-color: ${({ theme }) => theme.colors.midnightBlue};
    color: white;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-weight: bold;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
`;

const ChatContent = styled.div`
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: #f9f9f9;
`;

const MessageWrapper = styled.div<{ $isAI?: Role }>`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    gap: 8px;
    align-self: ${({ $isAI }) =>
        $isAI === "assistant" ? "flex-start" : "flex-end"};
`;

const Message = styled(Text)<{ $isAI?: Role }>`
    background-color: #19275f;
    color: #fff;
    padding: 8px 12px;
    border-radius: 16px;
    max-width: 75%;
    word-wrap: break-word;
    font-size: 0.875rem;
`;

const ChatInputWrap = styled.form`
    display: flex;
    padding: 8px;
    background-color: ${({ theme }) => theme.colors.lightGray};
    border-top: 1px solid #e0e0e0;
`;

const ChatInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
`;

const SendButton = styled(Button)<{ disabled?: boolean }>`
    margin-left: 8px;
    border-radius: 8px;
    padding: 10px 16px;
    cursor: pointer;
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#19275f")};
    color: ${({ disabled }) => (disabled ? "#888" : "#fff")};
    &:hover {
        background-color: ${({ disabled }) => (disabled ? "#ccc" : "#3a4a8a")};
    }
`;

const MarkDownWrap = styled(Markdown)<{ $isAI?: Role }>`
    background-color: #e3f2fd;
    color: #000;
    padding: 8px 12px;
    border-radius: 16px;
    max-width: 75%;
    word-wrap: break-word;
    font-size: 0.875rem;
`