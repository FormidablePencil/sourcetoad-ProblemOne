var arr = [
  {
    guest_type: "crew",
    first_name: "Marco",
    last_name: "Burns",
    guest_booking: {
      room_no: "A0073",
      some_array: [7, 2, 4],
    },
  },
  {
    guest_type: "guest",
    first_name: "John",
    last_name: "Doe",
    guest_booking: {
      room_no: "C73",
      some_array: [1, 3, 5, 2, 4, 3],
    },
  },
  {
    guest_type: "guest",
    first_name: "Jane",
    last_name: "Doe",
    guest_booking: {
      room_no: "C73",
      some_array: [1, 3, 5, 2, 4, 3],
    },
  },
  {
    guest_type: "guest",
    first_name: "Albert",
    last_name: "Einstein",
    guest_booking: {
      room_no: "B15",
      some_array: [2, 5, 6, 3],
    },
  },
  {
    guest_type: "crew",
    first_name: "Jack",
    last_name: "Daniels",
    guest_booking: {
      room_no: "B15",
      some_array: [2, 5, 6, 3],
    },
  },
  {
    guest_type: "guest",
    first_name: "Alan",
    last_name: "Turing",
    guest_booking: {
      room_no: "B15",
      some_array: [2, 5, 6, 3],
    },
  },
];

class Mutator {
  a;

  constructor(a) {
    this.a = a;
  }

  problem1() {
    return this.a.map((element) => {
      element.room_no = element.guest_booking.room_no;
      element.some_array = [...element.guest_booking.some_array];
      this.problem1_reusable_logic();
    });
  }

  problem2() {
    this.a.map((element) => {
      element.room_no = element.guest_booking.room_no;
      element.some_array = [...element.guest_booking.some_array];
      element.some_total = element.some_array.reduce((a, b) => a + b);
      delete element["some_array"];
      return element;
    });
    this.problem1_reusable_logic();
    return this.a;
  }

  problem3() {
    this.problem2();
    this.a = this.a.filter((element) => element.guest_type === "guest");
    return this.a;
  }

  problem4() {
    this.problem3();
    // first name will takes precedence over last name in alphabetical order
    this.sort_alphabetically("last_name");
    this.sort_alphabetically("first_name");

    return this.a;
  }

  sort_alphabetically(key) {
    return this.a.sort((first, second) =>
      first[key].localeCompare(second["first_name"])
    );
  }

  problem1_reusable_logic() {
    this.a.map((element) => {
      delete element["guest_booking"];
      return element;
    });
  }
}

function mutateArray(a) {
  return new Mutator(a).problem4();
}

$(document).ready(function () {
  $("#originalArray").html(JSON.stringify(arr, null, 2));
  $("#resultsArray").html(JSON.stringify(mutateArray(arr), null, 2));
});
