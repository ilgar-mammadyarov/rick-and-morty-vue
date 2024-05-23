<script setup lang="ts">
import { CharacterApiDto, CharacterResultApiDto, CharacterStatus } from './models'
import { onMounted, ref } from 'vue';
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import Card from './components/Card.vue';



const search = ref("")
const statuses = ref<CharacterStatus[]>([
  { text: 'All status', value: '', selected: true },
  { text: 'Alive', value: 'alive', selected: false },
  { text: 'Dead', value: 'dead', selected: false },
  { text: 'Unknown', value: 'unknown', selected: false },]);
const selectedStatus = ref<CharacterStatus>(statuses.value[0])
const currentPage = ref(1);
const characters: CharacterResultApiDto[] = ref([]);
const lastPage = ref(0);


onMounted(() => {
  init()
})


const init = () => {
  fetch('https://rickandmortyapi.com/api/character').then(response => response.json())
    .then((data: CharacterApiDto) => {
      characters.value = data.results
      lastPage.value = data.info?.pages || 0
    })
}

const searchCharacters = () => {
  const searchValue = search.value.toLowerCase();
  currentPage.value = 1;
  if (searchValue || selectedStatus.value?.text) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage.value}&name=${searchValue}&status=${selectedStatus.value?.value}`)
      .then(response => response.json())
      .then((data: CharacterApiDto) => {
        characters.value = data.results
        lastPage.value = data.info.pages
      })
  } else {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then((data: CharacterApiDto) => {
        characters.value = data.results
        lastPage.value = data.info.pages
      })
  }
}

const changePage = (nextPage: number) => {
  console.log({ nextPage })
  const searchValue = search.value.toLowerCase();
  currentPage.value = nextPage;

  fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage.value}&name=${searchValue}&status=${selectedStatus.value?.value}`)
    .then(response => response.json())
    .then((data: CharacterApiDto) => {
      characters.value = data.results
      lastPage.value = data.info.pages
    })
}
</script>

<template>
  <main class="flex flex-col">
    <Header />
    <Hero />
    <section class="grow-1 bg-[--bg-black-01] p-6 sm:py-20 sm:px-0">
      <form class="max-w-card mx-auto">
        <div class="flex">
          <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only">Status</label>
          <select v-model="selectedStatus" id="statuses"
            class="py-2.5 px-4 text-sm font-medium text-center text-gray-300 bg-[--bg-black-02] border border-[--orange-01] rounded-s-lg outline-none">
            <option v-for="status in statuses" :selected="status.selected" :value="status">{{ status.text }}
            </option>
          </select>
          <div class="relative w-full">
            <input type="search" id="search-dropdown" v-model="search"
              class="block p-2.5 w-full z-20 text-sm text-gray-300 bg-[--bg-black-02] rounded-e-lg border-s-0 border border-[--orange-01] outline-none"
              placeholder="Search..." />
            <button type="submit" @click="searchCharacters"
              class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full hover:bg-[--orange-01] text-white rounded-e-lg border border-[--orange-01]">
              Apply
            </button>
          </div>
        </div>
      </form>

      <div class="flex flex-col gap-y-6 py-6">
        <div v-for="character in characters" v-bind:key="character.id">
          <Card :character="character" />
        </div>
      </div>

      <nav>
        <ul class="flex items-center -space-x-px h-10 text-base justify-center">
          <button class="group" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
            <a href="#"
              class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-[--bg-black-01] group-disabled:text-[--bg-black-01] border border-e-0 border-[--orange-01] rounded-s-lg hover:text-[--orange-01]">
              <span class="sr-only">Previous</span>
              <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 1 1 5l4 4" />
              </svg>
            </a>
          </button>
          <div>
            <a href="#" aria-current="page"
              class="z-10 flex items-center justify-center px-4 h-10 leading-tight border text-[--orange-01] border-[--orange-01]">
              {{ currentPage }}
            </a>
          </div>
          <button class="group" :disabled="currentPage === lastPage" @click="changePage(currentPage + 1)">
            <a href="#"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-[--bg-black-01] border hover:text-[--orange-01] group-disabled:text-[--bg-black-01] border-[--orange-01] rounded-e-lg">
              <span class="sr-only">Next</span>
              <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 9 4-4-4-4" />
              </svg>
            </a>
          </button>
        </ul>
      </nav>

    </section>
  </main>
</template>

<style scoped>
.header-bg-img {
  background-image: url('./assets/header-bg.svg');
  background-repeat: no-repeat;
  background-position: center;
}
</style>
