<template>
  <div>
    <!-- Título del juego -->
    <h1 class="title">GAME TITLE</h1>
    <hr>
    <div class="first-container">
      <div class="left">
        <button class="download-button">DOWNLOAD</button>
      </div>
      <div class="right">
        <div class="container-image">
          <img src="/src/assets/ForzaHorizon5_mainImage.jpg" alt="" class="main-image">
        </div>
        <div class="text-container">
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
          </p>
        </div>
      </div>
    </div>
    <div class="scnd-container">
      <h1 class="title">DESCRIPTION</h1>
      <hr>
      <p class="description-text">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
      </p>
    </div>
  </div>
</template>

<style scoped>

.main-image {
  max-width: 100%;
  border-radius: 10px;
}

.title {
  font-family: var(--font-archivo-black);
  margin-top: 20px;
}

.download-button {
  display: block;
  width: 200px;
  margin: 20px 0;
  padding: 10px;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  height: 200px;
}


hr {
  width: 95%;
  margin-left: 20px;
  border-color: #000;
  margin-bottom: 10px;
}

h1 {
  margin-left: 20px;
  font-family: var(--font-archivo-black);
}

.container-image {
  display: flex;
  justify-content: center;
  height: 40%;
  margin-bottom: 10px;
}

.text-container {
  text-align: center;
  width: 80%;
}

.description-text{
  width: 95%;
  margin-left: 20px;
}

.first-container {
  display: flex;
  gap: 10px;
  margin-bottom: -100px;
  margin-left: 20px;
  margin-right: 20px;
}

.left {
  flex: 1.25;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right {
  flex: 2.75;
  display: flex;
  flex-direction: column;
  align-items: center;
}
p{
  text-align: justify;
  line-height: 30px;
  font-family: var(--font-roboto);
}
</style>
