<template>
  <div class="container">
    <div class="columns">
      <section class="column is-two-fifths">
        <div class="migration-config">
          <div class="section-title"><h2>Migration configuration</h2></div>

          <div class="subsection">
            <p class="subsection-title">Table name</p>
            <b-input v-model="tableName" placeholder="e.g. products"></b-input>
          </div>

          <div class="table-name-wrapper subsection">
            <p class="subsection-title">Table operation</p>
            <div class="block">
              <b-radio v-model="tableOperation" native-value="create">
                Create table
              </b-radio>
              <b-radio v-model="tableOperation" native-value="drop">
                Drop table
              </b-radio>
              <b-radio v-model="tableOperation" native-value="rename">
                Rename table
              </b-radio>
              <b-radio v-model="tableOperation" native-value="modify">
                Modify table
              </b-radio>
            </div>
            <div class="block" v-if="tableOperation === 'rename'">
              <b-field label="Rename to">
                <b-input v-model="tableNewName" placeholder="users"></b-input>
              </b-field>
            </div>
          </div>

          <new-field-form :newField.sync="newField" :addField="addField" />

          <div class="table-fields-wrapper subsection mt-6">
            <p class="subsection-title">Table fields</p>
            <ul class="tablefields-list" v-if="fields.length">
              <li
                class="field-list-item"
                v-for="(field, index) in fields"
                :key="field.id"
              >
                <div class="field-single">
                  <div class="fieldinfo">
                    <span>{{ field.name }}</span>
                    <span class="field-type">{{ field.type }}</span>
                  </div>
                  <div class="buttons">
                    <button
                      class="button is-light is-small"
                      aria-controls="contentIdForA11y${field.id}"
                      @click="field.editMode = !field.editMode"
                    >
                      <v-icon name="edit"></v-icon>
                    </button>
                    <button
                      class="button is-danger is-small"
                      @click="removeField(index)"
                    >
                      <v-icon name="x"></v-icon>
                    </button>
                  </div>
                </div>
                <div v-if="field.editMode">
                  <edit-field-form :field="field" />
                </div>
                <hr class="divider" />
              </li>
            </ul>
            <div v-else class="no-fields my-4 mb-4">
              You have no existing fields yet. Please add them below 😎
            </div>
          </div>
        </div>
      </section>

      <section class="column is-three-fifths">
        <div class="code-wrapper">
          <b-button
            class="is-pulled-right copy-to-clipboard-btn"
            type="is-dark"
            v-clipboard="() => code"
            v-clipboard:success="clipboardSuccessHandler"
          >
            <v-icon name="copy"></v-icon> Copy to clipboard
          </b-button>
          <prism-editor :code="code" language="php" readonly></prism-editor>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PrismEditor from "vue-prism-editor";
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-markup-templating.js";
import "prismjs/components/prism-php.js";
import NewFieldForm from "@/components/generator/NewFieldForm.vue";
import EditFieldForm from "@/components/generator/EditFieldForm.vue";
import { TableField, TableOperation } from "@/interfaces/generator";

@Component({
  components: {
    PrismEditor,
    NewFieldForm,
    EditFieldForm
  }
})
export default class Generator extends Vue {
  tableName = "";
  tableOperation: TableOperation = "create";
  tableNewName = "";

  fields: TableField[] = [];

  newField: TableField = {
    id: Math.random(),
    type: "",
    name: "",
    editMode: false,
    nullable: false,
    unsigned: false,
    autoIncrement: false
  };

  private get code() {
    if (this.tableOperation == "drop") {
      return `
    <?php

    use Illuminate\\Support\\Facades\\Schema;
    use Illuminate\\Database\\Schema\\Blueprint;
    use Illuminate\\Database\\Migrations\\Migration;

    class ${this.tableOperation.charAt(0).toUpperCase() +
      this.tableOperation.slice(1)}${this.tableName.charAt(0).toUpperCase() +
        this.tableName.slice(1)}Table extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::drop('${this.tableName}');
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            Schema::create('${this.tableName.toLowerCase().trim()}');
        }
    }
    `;
    } else if (this.tableOperation == "rename") {
      return `
    <?php

    use Illuminate\\Support\\Facades\\Schema;
    use Illuminate\\Database\\Schema\\Blueprint;
    use Illuminate\\Database\\Migrations\\Migration;

    class ${this.tableOperation.charAt(0).toUpperCase() +
      this.tableOperation.slice(1)}${this.tableName.charAt(0).toUpperCase() +
        this.tableName.slice(1)}Table extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::rename('${this.tableName
              .toLowerCase()
              .trim()}', '${this.tableNewName.toLowerCase().trim()}');
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            Schema::rename('${this.tableNewName
              .toLowerCase()
              .trim()}', '${this.tableName.toLowerCase().trim()}');
        }
    }
    `;
    } else if (this.tableOperation == "modify") {
      return `
    <?php

    use Illuminate\\Support\\Facades\\Schema;
    use Illuminate\\Database\\Schema\\Blueprint;
    use Illuminate\\Database\\Migrations\\Migration;

    class ${this.tableOperation.charAt(0).toUpperCase() +
      this.tableOperation.slice(1)}${this.tableName.charAt(0).toUpperCase() +
        this.tableName.slice(1)}Table extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::${"table"}('${this.tableName
        .toLowerCase()
        .trim()}', function (Blueprint $table) {
                ${this.fieldsString}
            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            Schema::${"table"}('${this.tableName
        .toLowerCase()
        .trim()}', function (Blueprint $table) {
                ${this.dropFieldsString}
            });
        }
    }
    `;
    } else {
      return `
    <?php

    use Illuminate\\Support\\Facades\\Schema;
    use Illuminate\\Database\\Schema\\Blueprint;
    use Illuminate\\Database\\Migrations\\Migration;

    class ${this.tableOperation.charAt(0).toUpperCase() +
      this.tableOperation.slice(1)}${this.tableName.charAt(0).toUpperCase() +
        this.tableName.slice(1)}Table extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::${"create"}('${this.tableName
        .toLowerCase()
        .trim()}', function (Blueprint $table) {
                ${this.fieldsString}
            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            Schema::drop('${this.tableName.toLowerCase().trim()}');
        }
    }
    `;
    }
  }

  private get fieldsString() {
    let fieldsString = "";

    if (!this.fields.length) {
      return `// Please add your fields`;
    }

    for (const [index, field] of this.fields.entries()) {
      let indent = "";
      let newLine = "\n";
      const unsigned = field.unsigned ? "->unsigned()" : "";
      const nullable = field.nullable ? "->nullable()" : "";
      const autoIncrement = field.autoIncrement ? "->autoIncrement()" : "";

      if (index > 0) {
        indent = "                ";
      }

      if (index === this.fields.length - 1) {
        newLine = "";
      }

      fieldsString =
        fieldsString +
        indent +
        `$table->${field.type}('${field.name}')${nullable}${unsigned}${autoIncrement};` +
        newLine;
    }

    return fieldsString;
  }

  private get dropFieldsString() {
    let fieldsString = "";

    if (!this.fields.length) {
      return `// Please add your fields`;
    }

    for (const [index, field] of this.fields.entries()) {
      let indent = "";
      let newLine = "\n";

      if (index > 0) {
        indent = "                ";
      }

      if (index === this.fields.length - 1) {
        newLine = "";
      }

      fieldsString =
        fieldsString +
        indent +
        `$table->dropColumn('${field.name}');` +
        newLine;
    }

    return fieldsString;
  }

  private addField() {
    this.fields.push(this.newField);
    this.newField = {
      id: Math.random(),
      type: "",
      name: "",
      editMode: false,
      nullable: false,
      unsigned: false,
      autoIncrement: false
    };
  }

  private removeField(fieldIndex: number) {
    this.fields.splice(fieldIndex, 1);
  }

  private clipboardSuccessHandler() {
    this.$buefy.snackbar.open(`Code was succesfully pasted to clipboard`);
  }
}
</script>

<style lang="scss">
.migration-config,
.code-wrapper {
  background: #2d2d2d;
  height: 100%;
  border-radius: 5px;
  box-shadow: 1px 1px 3px -1px #151515;
  overflow: hidden;
  position: relative;
}
.migration-config {
  padding: 20px;
}
.no-fields {
  border: 2px dashed #757575;
  padding: 20px;
  text-align: center;
}
.icon {
  font-size: 10px;
}
.field-single {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
}
.divider {
  margin: 0.7rem 0;
  background-color: #626262;
}
.section-title {
  margin: -20px -20px 20px -20px;
  background: #7957d5;
  padding: 20px;
  h2 {
    font-weight: bold;
    font-size: 18px;
  }
}
.subsection {
  margin: 30px 0;
}
.subsection-title {
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
  border-bottom: 2px solid #7957d5;
  display: inline-block;
  margin-bottom: 10px;
}
.copy-to-clipboard-btn {
  position: absolute !important;
  right: 10px;
  top: 10px;
  .icon {
    margin-right: 5px !important;
  }
}
.field-type {
  font-size: 14px;
  color: #777;
  margin-left: 10px;
}
</style>
