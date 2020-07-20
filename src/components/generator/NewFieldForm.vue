<template>
  <div class="new-field-form-wrapper subsection">
    <p class="subsection-title">New field</p>
    <b-field label="Field name">
      <b-input v-model="newField.name" placeholder="e.g first_name"></b-input>
    </b-field>
    <b-field label="Field type">
      <b-autocomplete
        v-model="newField.type"
        :data="filteredDataArray"
        placeholder="e.g. string"
        clearable
        open-on-focus
      >
        <template slot="empty">No results found</template>
      </b-autocomplete>
    </b-field>
    <div class="block">
      <b-checkbox v-model="newField.autoIncrement" :native-value="false"
        >autoincrement</b-checkbox
      >
      <b-checkbox v-model="newField.nullable" :native-value="false"
        >nullable</b-checkbox
      >
      <b-checkbox v-model="newField.unsigned" :native-value="false"
        >unsigned</b-checkbox
      >
    </div>
    <b-button class="is-pulled-right" @click="addField" type="is-primary"
      ><v-icon name="plus"></v-icon> Add field</b-button
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { fieldTypesArray } from "./fieldTypes";
import { TableField } from "@/interfaces/generator";

@Component({
  components: {}
})
export default class NewFieldForm extends Vue {
  @Prop() newField!: TableField;
  @Prop() addField!: Function;

  fieldTypes = fieldTypesArray;

  private get filteredDataArray() {
    return this.fieldTypes.filter(option => {
      return (
        option
          .toString()
          .toLowerCase()
          .indexOf(this.newField.type.toLowerCase()) >= 0
      );
    });
  }
}
</script>
