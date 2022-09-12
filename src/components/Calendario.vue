<template>
  <q-input  v-model="date" mask="date" :rules="['date']">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
</template>



<script>
export default {
  name: 'Calendario',
  data(){
    return {
      date: ('12/09/2022')
    }
  }

}
</script>
