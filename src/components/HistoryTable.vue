<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{$filters.localize.localizeFilter('Sum')}}</th>
      <th>{{$filters.localize.localizeFilter('Date')}}</th>
      <th>{{$filters.localize.localizeFilter('Category')}}</th>
      <th>{{$filters.localize.localizeFilter('Type')}}</th>
      <th>{{$filters.localize.localizeFilter('Open')}}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) in records" :key="record.id">
      <td>{{idx + 1}}</td>
      <td>{{$filters.filter.currencyFilter(Math.abs(record.amount), info.currency)}}</td>
      <td>{{originalDate(record.date)}}</td>
      <td>{{record.categoryName}}</td>
      <td>
        <span
            class="white-text badge red"
            :class="[record.typeClass]"
        >{{record.typeText}}</span>
      </td>
      <td>
        <button
            class="btn-small btn"
            @click="$router.push('/detail-record/' + record.id)"
            v-tooltip="$filters.localize.localizeFilter('View entry')"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
import {mapGetters} from "vuex";
export default {
  props: {
    records:{
      required:true,
      type: Array,
    }
  },
  mounted() {
  },
  methods: {
    originalDate(data) {
      const originalDate = new Date(data);
      const options = { timeZone: "UTC", hour12: false };
      return `${originalDate.toISOString().split('T')[0]}, ${originalDate.toLocaleTimeString("en-US", options)}`;

    }
  },
  computed: {
    ...mapGetters(['info'])

  },
}
</script>