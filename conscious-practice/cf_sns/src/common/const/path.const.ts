import { join } from 'path';

// 서버 프로젝트의 루트 폴더
export const PROJECT_ROOT_PATH = process.cwd();
// 외부에서 접근 가능한 폴더
export const PUBLIC_FOLDER_NAME = 'public';
// 포스트 이미지들을 저장할 폴더 이름
export const POSTS_FOLDER_NAME = 'posts';
// 경로를 만들어주는 함수
export const PUBLIC_FOLDER_PATH = join(PROJECT_ROOT_PATH, PUBLIC_FOLDER_NAME);
export const POST_IMAGE_PATH = join(PUBLIC_FOLDER_PATH, POSTS_FOLDER_NAME);

export const POST_PUBLIC_IMAGE_PATH = join(
  PUBLIC_FOLDER_NAME,
  POSTS_FOLDER_NAME,
);

// 임시 폴더 이름
export const TEMP_FOLDER_NAME = 'temp';
// 임시 파일 저장 폴더
export const TEMP_FOLDER_PATH = join(PUBLIC_FOLDER_PATH, TEMP_FOLDER_NAME);
