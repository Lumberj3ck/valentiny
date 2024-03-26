function transformData(inputData) {
  const transformedData = Object.keys(inputData).map(key => {
    const section = inputData[key];
    const textInputs = Object.keys(section.text_inputs).map(inputKey => {
      return {
        index: parseInt(inputKey),
        content: section.text_inputs[inputKey].content,
        id: section.text_inputs[inputKey].id
      };
    });
    const imageInputs = Object.keys(section.image_inputs).map(inputKey => {
      return {
        index: parseInt(inputKey),
        link: section.image_inputs[inputKey].link,
        id: section.image_inputs[inputKey].id
      };
    });
    return {
      index: section.index,
      id: section.id,
      name: key,
      render: section.render,
      background_color: section.background_color,
      text_color: section.text_color,
      image_inputs: imageInputs,
      text_inputs: textInputs
    };
  });
  return {"sections": transformedData};
}



export { transformData }