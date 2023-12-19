const onClickMyRow = (state, rowInfo, column, instance) => {
  return {
    onClick: (e, handleOriginal) => {
      e.preventDefault()
      console.log('>>>> onClickMyRow <<<<: ')
    }
  }
}

const onClickMyCell = (state, rowInfo, column, instance) => {
  return {
    onClick: (e, handleOriginal) => {
      e.preventDefault()
      console.log('>>>> onClickMyCell <<<<')
    }
  }
}

export default {
  onClickMyRow,
  onClickMyCell
}
