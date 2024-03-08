export const readStream = async (stream: any) => {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");
  let result = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      return result;
    }
    result += decoder.decode(value);
  }
};
