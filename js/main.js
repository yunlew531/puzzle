const { onMounted, ref, reactive, watch } = Vue;
const app = {
  setup() {
    const puzzleOriginArr = reactive({ imgArr: [] });
    const puzzleCompleteArr = reactive({ imgArr: [] });
    const correctNum = ref(0);
    const isComplete = ref(false);

    const moveComplete = (img, index) => {
      puzzleOriginArr.imgArr.splice(index, 1);
      puzzleCompleteArr.imgArr.push(img);
    };

    const moveOrigin = (img, index) => {
      puzzleCompleteArr.imgArr.splice(index, 1);
      puzzleOriginArr.imgArr.push(img);
    };

    watch(() => puzzleCompleteArr.imgArr, (newArr) => {
      correctNum.value = 0;
      newArr.forEach((img, key) => {
        if (img.index === key) {
          correctNum.value++;
        }
      });
    }, { deep: true });

    watch(correctNum, () => {
      console.log(correctNum.value);
      if (correctNum.value === 9) {
        isComplete.value = true;
      }
    })

    onMounted(() => {
      const api = './json/puzzle.json';
      axios.get(api)
        .then(res => {
          puzzleOriginArr.imgArr = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    });

    return {
      puzzleOriginArr,
      puzzleCompleteArr,
      moveComplete,
      moveOrigin,
      isComplete,
    };
  },
};

Vue.createApp(app).mount('#app');