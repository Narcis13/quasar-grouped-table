<template>
  <q-page class="flex flex-center">
      <q-group-table grouped :title="niceTitle" :data="users" :columns="column_defs"/>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data(){
    return {
      niceTitle:'Employees',
      column_defs:[    
        { name: 'index', align: 'center', label: 'Index', field: 'index' },
        { name: 'balance', label: 'Balance', field: 'balance' },
        { name: 'eyecolor', label: 'Eye Color', field: 'eyeColor' },
        { name: 'name', label: 'Name', field: 'name' },
        { name: 'gender', label: 'Gender', field: 'gender' },
        { name: 'company', label: 'Company', field: 'company' }
        
        ],
      users:[
        {
          index: 0,
          balance: "$3,091.58",
          eyeColor: "green",
          name: "Stafford Mathews",
          gender: "male",
          company: "APPLE"
        },
        {
          index: 1,
          balance: "$3,305.95",
          eyeColor: "brown",
          name: "Darlene Harvey",
          gender: "female",
          company: "AMAZON"
        },
        {
          index: 2,
          balance: "$2,943.30",
          eyeColor: "brown",
          name: "Rochelle Morse",
          gender: "female",
          company: "GOOGLE"
        },
        {
          index: 3,
          balance: "$1,228.44",
          eyeColor: "brown",
          name: "Holloway Joseph",
          gender: "male",
          company: "GOOGLE"
        },
        {
          index: 4,
          balance: "$3,501.66",
          eyeColor: "green",
          name: "Leona Alford",
          gender: "female",
          company: "GOOGLE"
        },
        {
          index: 5,
          balance: "$3,615.24",
          eyeColor: "brown",
          name: "Rojas Madden",
          gender: "male",
          company: "AMAZON"
        },
        {
          index: 6,
          balance: "$1,942.56",
          eyeColor: "blue",
          name: "Mann Lloyd",
          gender: "male",
          company: "GOOGLE"
        },
        {
          index: 7,
          balance: "$1,640.86",
          eyeColor: "brown",
          name: "Jeannine Trevino",
          gender: "female",
          company: "APPLE"
        },
        {
          index: 8,
          balance: "$1,472.26",
          eyeColor: "green",
          name: "Reba Sellers",
          gender: "female",
          company: "APPLE"
        },
        {
          index: 9,
          balance: "$1,824.55",
          eyeColor: "brown",
          name: "Osborn Stein",
          gender: "male",
          company: "GOOGLE"
        },
        {
          index: 10,
          balance: "$1,057.34",
          eyeColor: "blue",
          name: "Sarah Cantrell",
          gender: "female",
          company: "AMAZON"
        },       
        {
          index: 11,
          balance: "$1,328.18",
          eyeColor: "blue",
          name: "Traci Mcguire",
          gender: "female",
          company: "GOOGLE"
        },
        {
          index: 12,
          balance: "$2,848.73",
          eyeColor: "brown",
          name: "Karina Rose",
          gender: "female",
          company: "GOOGLE"
        },       
        {
          index: 13,
          balance: "$1,379.99",
          eyeColor: "green",
          name: "Caroline Lamb",
          gender: "female",
          company: "GOOGLE"
        },
        {
          index: 14,
          balance: "$3,593.06",
          eyeColor: "brown",
          name: "Trudy Savage",
          gender: "female",
          company: "AMAZON"
        },
        {
          index: 15,
          balance: "$2,207.32",
          eyeColor: "brown",
          name: "Elinor Burch",
          gender: "female",
          company: "GOOGLE"
        },
        {
          index: 16,
          balance: "$1,493.05",
          eyeColor: "green",
          name: "Walls Sawyer",
          gender: "male",
          company: "AMAZON"
        },
        {
          index: 17,
          balance: "$3,149.86",
          eyeColor: "blue",
          name: "Porter Ayala",
          gender: "male",
          company: "GOOGLE"
        },
        {
          index: 18,
          balance: "$3,773.37",
          eyeColor: "blue",
          name: "Mooney Frederick",
          gender: "male",
          company: "AMAZON"
        }
    ]
    }
  }
}
</script>
