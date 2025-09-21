const ToiletInfo = ({ text }: { text: string | null }) => {
  // データがnullか空文字なら何も表示しない
  if (!text) {
    return null;
  }

  // 文字列に「車椅子」が含まれている場合
  if (text.includes('車椅子')) {
    return (
      <span className="text-xs font-semibold text-blue-600 ml-2 border border-blue-500 bg-blue-50 rounded-full px-2 py-1">
        ♿️ {text}
      </span>
    );
  }

  // それ以外の場合（通常のトイレなど）
  return (
    <span className="text-xs text-muted-foreground ml-2">
      🚻 {text}
    </span>
  );
};

export default ToiletInfo;
