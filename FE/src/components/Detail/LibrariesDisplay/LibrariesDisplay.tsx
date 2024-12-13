import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import { Heading } from "@components/Common";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { DEFAULT_INDEX } from "@/constants";
import useGetQuery from "@/hooks/Queries/useGetQuery";
import { LibrariesType } from "@/types/libraryType";

interface LibrariesDisplayProps {
    isbn13: string;
    regionCode: string;
    subRegionCode: string;
}

const LibrariesDisplay = ({
    isbn13,
    regionCode,
    subRegionCode,
}: LibrariesDisplayProps) => {
    const [selectedLibrary, setSelectedLibrary] =
        useState<LibrariesType | null>(null);
    const { data, isLoading } = useGetQuery(
        "libSrchByBook",
        `${regionCode}&${subRegionCode}`,
        `&isbn=${isbn13}&region=${regionCode}&dtl_region=${subRegionCode}`
    );
    useEffect(() => {
        if (!isLoading && data.response.libs.length > 0) {
            setSelectedLibrary(data.response.libs[DEFAULT_INDEX]);
        }
    }, [data, isLoading]);
    if (isLoading) return <div>...isLoading</div>;

    const libraries: LibrariesType[] = data.response.libs;

    console.log(libraries)

    return (
        <ListWrap>
            {libraries.map((item) => (
                <LibraryCard
                    key={item.lib.libCode}
                    $selected={
                        item.lib.libCode === selectedLibrary?.lib.libCode
                    }
                    onClick={() => setSelectedLibrary(item)}
                >
                    <LibraryContent>
                        <LibraryDetails>
                            <Heading fontSize="md" fontWeight="bold">
                                {item.lib.libName}
                            </Heading>
                            <LibraryInfo>
                                <InfoRow>
                                    <EnvironmentOutlined />
                                    <span>{item.lib.address}</span>
                                </InfoRow>
                                <InfoRow>
                                    <PhoneOutlined />
                                    <span>{item.lib.tel}</span>
                                </InfoRow>
                            </LibraryInfo>
                        </LibraryDetails>
                        <ActionsContainer>
                            <HomepageButton
                                href={item.lib.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                홈페이지
                            </HomepageButton>
                            <StyledButton>대출확인</StyledButton>
                        </ActionsContainer>
                    </LibraryContent>
                </LibraryCard>
            ))}
        </ListWrap>
    );
};

export default LibrariesDisplay;

const ListWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 400px;
    overflow-y: auto;
    padding-right: 0.5rem;

    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }
    &::-webkit-scrollbar-track {
        background: #f1f5f9;
    }
`;

const LibraryCard = styled.div<{ $selected: boolean }>`
    padding: 1rem;
    border: 1px solid ${({ $selected }) => ($selected ? "#3b82f6" : "#e5e7eb")};
    border-radius: 0.5rem;
    background-color: ${({ $selected }) => ($selected ? "#eff6ff" : "white")};
    cursor: pointer;
    transition: all 0.2s ease;
`;

const LibraryContent = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
`;
const LibraryDetails = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const LibraryInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: #6b7280;
`;

const InfoRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ActionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    min-width: 140px;
`;

const buttonStyles = css`
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    font-weight: 500;
    border-radius: 0.375rem;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    display: inline-block;
`;

export const HomepageButton = styled.a`
    ${buttonStyles}
    background-color: #3b82f6;
    color: white;
    text-decoration: none;

    &:hover {
        background-color: #2563eb;
    }
`;

export const StyledButton = styled.button`
    ${buttonStyles}
    background-color: #10b981;
    color: white;
    border: none;

    &:hover {
        background-color: #059669;
    }
`;