## 흠냐흠냐 겨우 잘 되는 것 같아요

-   서버에서는 prefetchQuery, dehydrate, getQueryData 사용
-   클라이언트에서는 서버에서 첫 데이터로 받은 길이5의 배열에
-   useInfiniteQuery 사용해 추가적으로 fetch 하고
-   react-intersection-observer 로 무한 스크롤 구현
-   isFetching 일때 loading 도 보여주고 기존 데이터도 자연스럽게 보이도록 하기 위해서
-   초기 서버에서 가져온 places 와 추가로 가져온 infiniteData 를 합치고 undefined 값을 제거 한뒤
-   합쳐진 배열에서 중복되는 데이터를 제거하는 Set을 임시로 사용
-   useInfiniteQuery 를 제대로 조절하는 것이 추후 궁극적인 해결책!
