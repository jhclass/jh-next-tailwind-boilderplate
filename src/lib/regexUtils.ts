export const regexUtils = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // 국제 이메일 형식
  phone: /^\+?\d{1,4}?[-.\s]?(\d{1,4}[-.\s]?){1,4}\d{1,4}$/, // 국제 전화번호 형식
  url: /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/, // 국제 도메인 URL 검증
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // 영문+숫자+특수문자 8자 이상
  username: /^[a-zA-Z0-9_-]{3,16}$/, // 글로벌 사용자명 (3~16자, 영문+숫자+언더바+하이픈 허용)
  hexColor: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/, // HEX 색상 코드
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, // URL 슬러그 (예: my-page-title)
  number: /^\d+$/, // 숫자만 허용
  ipv4: /^(?:\d{1,3}\.){3}\d{1,3}$/, // IPv4 주소 검증
  ipv6: /^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}$/, // IPv6 주소 검증
  noSpecialChars: /^[\p{L}\p{N}]+$/u, // 모든 언어의 문자 & 숫자만 허용 (국제화 지원)
}
