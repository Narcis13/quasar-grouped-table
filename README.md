
Try to make a grouping feature for awesome Quasar Framework tablle component #hack-a-may 

[Demo:](https://brave-mayer-7a5dd5.netlify.app)

# QGroupedTable

<!-- Please note, this is currently a work-in-progress (WIP). -->

QGroupedTable is a [Quasar App Extension](https://quasar.dev/app-extensions/introduction).  It allows you to display data grouped on specific columns in a well known QTable component.

## Install

To add this App Extension to your Quasar application, run the following (in your Quasar app folder):

```bash
quasar ext add q-grouped-table
```

# Uninstall
To remove this App Extension from your Quasar application, run the following (in your Quasar app folder):

```
quasar ext remove q-grouped-table
```


# Defining the columns


    [    
        { name: 'index', align: 'center', label: 'Index', field: 'index' },
        { name: 'balance', label: 'Balance', field: 'balance',align: 'center' },
        { name: 'eyecolor', label: 'Eye Color', field: 'eyecolor',align: 'center',formatGroupHeader:(value,count)=>`Stuff with ${value} eyes (${count} people)` },
        { name: 'name', label: 'Name', field: 'name',align: 'left' },
        { name: 'gender', label: 'Gender', field: 'gender',align: 'center' },
        { name: 'company', label: 'Company', field: 'company',align: 'left',formatGroupHeader:(value,count)=>`${count} people in ${value} company` }
        
        ]

     
# Defining Data

     [
        {
          index: 0,
          balance: "$3,091.58",
          eyecolor: "green",
          name: "Stafford Mathews",
          gender: "male",
          company: "APPLE"
        },
        {
          index: 1,
          balance: "$3,305.95",
          eyecolor: "brown",
          name: "Darlene Harvey",
          gender: "female",
          company: "AMAZON"
        }, etc.....

     ]

# QGroupedTable usage


      <q-group-table :loading="loading" dense dark :group-on="group" :title="niceTitle" :data="users" :columns="column_defs"  selection="single" :selected.sync="selected" @select="get_selection($event)">
      <template v-slot:top>
        <q-btn dense dark color="primary" :disable="loading" label="Add row" @click="addrow" />
        <q-space />
        <q-input outlined dense dark debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      </q-group-table>



# Source

can be found [here](https://github.com/Narcis13/quasar-grouped-table).


# Online Demo

can be found [here](https://brave-mayer-7a5dd5.netlify.app).



Thank you Quasar  for being such a nice framework!