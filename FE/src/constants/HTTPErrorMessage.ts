export const HTTP_ERROR_MESSAGE = {
    400: {
        HEADING: "잘못된 요청입니다.",
        BODY: "확인 후 다시 시도해주세요.",
        BUTTON: "새로고침",
    },
    401: {
        HEADING: "인증되지 않은 요청입니다.",
        BODY: "로그인이 필요한 서비스입니다.",
        BUTTON: "로그인 페이지로 이동",
    },
    403: {
        HEADING: "접근 권한이 없습니다.",
        BODY: "해당 리소스에 대한 접근 권한이 없습니다.",
        BUTTON: "홈으로 돌아가기",
    },
    404: {
        HEADING: "404",
        BODY: "요청하신 페이지를 찾을 수 없습니다.",
        BUTTON: "홈으로 돌아가기",
    },
    500: {
        HEADING: "서버 오류가 발생했습니다",
        BODY: "잠시 후 다시 요청해주세요.",
        BUTTON: "새로고침",
    },
    503: {
        HEADING: "서비스를 일시적으로 이용할 수 없습니다.",
        BODY: "서버가 일시적으로 과부하 상태이거나 유지보수 중입니다.",
        BUTTON: "새로고침",
    },
    429: {
        HEADING: "1일 요청 제한 초과",
        BODY: "요청 가능한 하루 제한 횟수를 초과했습니다. 내일 다시 시도해주세요.",
        BUTTON: "새로고침",
    }
} as const;
