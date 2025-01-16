interface ILoading {
    isShow: boolean
    background: string
    isFull: boolean
  }
  
  const preloading = ref({
    background: '',
    isFull: true,
    isShow: false,
  })
  
  function handleKeyDown(event: KeyboardEvent) {
    event.stopPropagation()
    event.preventDefault()
  }
  
  const isPreloading = (show = true) => {
    preloading.value.isShow = show
    if (show)
      document.body.addEventListener('keydown', handleKeyDown)
    else
      document.body.removeEventListener('keydown', handleKeyDown)
  }
  
  const useLoading = () => {
    return {
      isPreloading,
      preloading,
    }
  }
  
  export default useLoading
  