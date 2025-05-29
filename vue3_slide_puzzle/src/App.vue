<template>
    <div class="box">
      <ul class="puzzle-wrap">
        <li 
          :class="{ 'puzzle': true, 'puzzle-empty': !puzzle }"
          v-for="(puzzle, index) in puzzles"
          :key="index"
          @click="moveFn(index)"
        >
          {{ puzzle }}
        </li>
      </ul>
      <button class="btn btn-warning btn-block btn-reset" @click="render">
        重置游戏 
      </button>
    </div>
</template>
   
<script setup>
  import { ref, onMounted } from 'vue';
   
  const puzzles = ref([]);
   
  // 初始化游戏 
  const render = () => {

    const puzzleArr = getRandomArr();
    
    // 添加空白格
    puzzles.value  = [...puzzleArr, ''];
  };

  // 计算随机数组，避免无解情况
  const getRandomArr = () =>{
    let puzzleArr = [];
    for (let i = 1; i < 16; i++) {
      puzzleArr.push(i); 
    }

    puzzleArr = puzzleArr.sort(()  => Math.random()  - 0.5);

    // 判断是否无解
    let inversion_num = 1;

    while (inversion_num % 2) {
      inversion_num = 0;

      // 随机打乱数组 
      puzzleArr = puzzleArr.sort(()  => Math.random()  - 0.5);

      for (let i=0;i<14;i++){
        if (puzzleArr[i+1]<puzzleArr[i]) {
          inversion_num++;
        }
      }
    }

    console.log(inversion_num);
    

    return puzzleArr;
  }
   
  // 移动方块逻辑 
  const moveFn = (index) => {
    const curNum = puzzles.value[index]; 
    const leftNum = puzzles.value[index  - 1];
    const rightNum = puzzles.value[index  + 1];
    const topNum = puzzles.value[index  - 4];
    const bottomNum = puzzles.value[index  + 4];
   
    // 左移条件：左边是空且不在第一列
    if (leftNum === '' && index % 4 !== 0) {
      puzzles.value[index  - 1] = curNum;
      puzzles.value[index]  = '';
    }
    // 右移条件：右边是空且不在第四列
    else if (rightNum === '' && (index + 1) % 4 !== 0) {
      puzzles.value[index  + 1] = curNum;
      puzzles.value[index]  = '';
    }
    // 上移条件：上方是空 
    else if (topNum === '') {
      puzzles.value[index  - 4] = curNum;
      puzzles.value[index]  = '';
    }
    // 下移条件：下方是空 
    else if (bottomNum === '' && index < 12) {
      puzzles.value[index  + 4] = curNum;
      puzzles.value[index]  = '';
    }
   
    passFn();
  };
   
  // 胜利检测 
  const passFn = () => {
    if (puzzles.value[[15]()]   === '') {
      const newPuzzles = puzzles.value.slice(0,  15);
      const isPass = newPuzzles.every((e,  i) => e === i + 1);
      if (isPass) {
        alert('恭喜，闯关成功！');
      }
    }
  };
   
  // 组件挂载时初始化游戏 
  onMounted(() => {
    render();
  });
</script>

<style scoped>

body {
    font-family: Arial, "Microsoft YaHei"; 
}

.box {
    width: 400px;
    margin: 50px auto 0;
    display: flex;
    flex-direction: column;
}

.puzzle-wrap {
    width: 400px;
    height: 400px;
    margin-bottom: 40px;
    padding: 0;
    background: #ccc;
    list-style: none;
}

.puzzle {
    float: left;
    width: 100px;
    height: 100px;
    font-size: 20px;
    background: #f90;
    text-align: center;
    line-height: 100px;
    box-shadow: 1px 1px 4px;
    text-shadow: 1px 1px 1px #B9B4B4;
    cursor: pointer;
}

.puzzle-empty {
    background: #ccc;
    box-shadow: inset 2px 2px 18px;
}

</style>