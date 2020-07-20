<template>
  <div class="new-field-form-wrapper subsection">
    <b-field label="Field name">
      <b-input v-model="field.name" placeholder="e.g first_name"></b-input>
    </b-field>
    <b-field label="Field type">
      <b-autocomplete
        v-model="field.type"
        :data="filteredDataArray"
        placeholder="e.g. string"
        clearable
        open-on-focus
      >
        <template slot="empty">No results found</template>
      </b-autocomplete>
    </b-field>
    <div class="block">
      <b-checkbox v-model="field.autoIncrement" :native-value="false"
        >autoincrement</b-checkbox
      >
      <b-checkbox v-model="field.nullable" :native-value="false"
        >nullable</b-checkbox
      >
      <b-checkbox v-model="field.unsigned" :native-value="false"
        >unsigned</b-checkbox
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { fieldTypesArray } from "./fieldTypes";
import { TableField } from "@/interfaces/generator";

@Component({
  components: {}
})
export default class EditFieldForm extends Vue {
  @Prop() field!: TableField;

  fieldTypes = fieldTypesArray;

  private get filteredDataArray() {
    return this.fieldTypes.filter(option => {
      return (
        option
          .toString()
          .toLowerCase()
          .indexOf(this.field.type.toLowerCase()) >= 0
      );
    });
  }
}
</script>
