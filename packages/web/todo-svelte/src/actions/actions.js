// 확인 : 수정하기 버튼 클릭 -> 키보드 tab 눌러 포커스 해제 -> 인풋 클릭 -> 전체 선택 되는 것 확인
export function selectOnFocus(node) {
  if (node && typeof node.select === "function") {
    // node가 정의되었고, select()를 가졌는지 확인
    const onFocus = (event) => node.select(); // event handler
    node.addEventListener("focus", onFocus); // when node gets focus call onFocus()
    return {
      destroy: () => node.removeEventListener("focus", onFocus), // this will be executed when the node is removed from the DOM
    };
  }
}

export const focusOnInit = (node) =>
  node && typeof node.focus === "function" && node.focus();
