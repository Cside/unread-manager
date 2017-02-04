const elapsedTime = (callback) => {
  const start = new Date();
  const result = callback();
  return [
    (new Date() - start).toLocaleString(), // msec
    result,
  ];
};

export default elapsedTime;
