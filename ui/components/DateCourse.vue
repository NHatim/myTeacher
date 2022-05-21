<template>
  <div>
    <v-row>
      <v-col cols="12" md="3">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              class="date-course"
              label="Date du cours"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              required
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker  ref="date" v-model="date" no-title scrollable :min="date" >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="11" md="3">
        <v-menu
          ref="menuBeginning"
          v-model="menuBeginning"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="startHour"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="startHour"
              label="Heure de début"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              required
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menuBeginning"
            v-model="startHour"
            format="24hr"
            full-width
            @click:minute="$refs.menuBeginning.save(startHour)"
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-col cols="11" md="3">
        <v-menu
          ref="menuEnd"
          v-model="menuEnd"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="endHour"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="endHour"
              label="Heure de fin"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              required
              :rules="[
                (val) => val >= startHour || 'La fin doit être après le début',
              ]"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menuEnd"
            v-model="endHour"
            format="24hr"
            full-width
            @click:minute="$refs.menuEnd.save(endHour)"
          ></v-time-picker>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DateCourse',
  props: {
    getDate: Function,
  },
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      startHour: '13:00',
      endHour: '16:00',
      menu: false,
      modal: false,
      menu2: false,
      menuBeginning: false,
      menuEnd: false,
      userName: 'Peter',
    }
  },
}
</script>
