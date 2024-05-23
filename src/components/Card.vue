<script setup lang="ts">
import { CharacterResultApiDto } from '../models';

defineProps<{ character: CharacterResultApiDto }>()


const getStatusColor = (status: string): string => {
    if (status === 'Alive') {
        return 'bg-[--bg-success]';
    } else if (status === 'Dead') {
        return 'bg-[--bg-error]';
    } else {
        return 'bg-[--orange-01]';
    }
}
</script>
<template>
    <div class="flex flex-col rounded-lg overflow-hidden sm:flex-row sm:max-w-card sm:w-card mx-auto">
        <div class=" max-h-56 overflow-hidden">
            <img :src="character.image" alt="Card image" class="w-full">
        </div>
        <div class=" p-3 bg-[--bg-black-02] w-full">
            <h3 class="text-white hover:text-[--orange-01] text-2xl font-bold">{{ character.name }}</h3>
            <div class="text-white text-base font-medium pb-3">
                <span class="h-2.5 w-2.5 rounded-lg inline-block mr-2" :class="getStatusColor(character.status)"></span>
                <span>{{ character.status }}</span> -
                <span>{{ character.species }}</span>
            </div>

            <p class="text-[--text-black-02] text-base font-medium">Last known location:</p>
            <p class="text-white hover:text-[--orange-01] text-base font-light pb-3">{{ character.location.name }}</p>

            <p class="text-[--text-black-02] text-base font-medium">First seen in:</p>
            <p class="text-white hover:text-[--orange-01] text-base font-light">{{ character.origin.name }}</p>
        </div>
    </div>
</template>
