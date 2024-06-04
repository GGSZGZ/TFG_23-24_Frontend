<template>
    <div class="method">
        <p class="paragraph">We accept these payment methods:</p>
        <div class="methods">
            <img src="/src/assets/visa-card.png" alt="" width="80px">
            <img src="/src/assets/mastercard.png" alt="" width="80px">
        </div>
    </div>
</template>

<style scoped>
.method {
    background-color: var(--color-black);
    color: var(--neutral-colors-white);
    padding: 20px;
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 200px;
    font-family: var(--font-archivo-black);
}

.paragraph {
    font-family: var(--font-roboto);
    margin-bottom: 10px; 
}

.methods {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
}
</style>
