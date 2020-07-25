$(document).ready(function() {
    //retrieve any data if present

    const signedInCustomer = JSON.parse(localStorage.getItem("signedInUser"));
    debugger;
    console.log(signedInCustomer);
    const signedInCustomerId = signedInCustomer.id;
    const signedInCustomerName = signedInCustomer.customer_name;
    const thisMonth = new Date().getMonth();
    const monthName = new Date().toLocaleString("default", { month: "long" });

    const thisYear = new Date().getFullYear();
    $("#budgetpage-title").text(
        `Hello ${signedInCustomerName} Lets set up your budget for ${monthName}/${thisYear}`
    );

    $.get(
        "/api/currentbudgetandactuals/" +
        signedInCustomerId +
        "/" +
        thisMonth +
        "/" +
        thisYear
    ).then(function(data) {
        if (data.length > 0) {
            console.log(data);
            $("#budgetpage-title").text(
                `Hello ${signedInCustomerName} Your budget is already setup for ${thisMonth}/${thisYear}`
            );
            debugger;
            for (let index = 0; index < data.length; index++) {
                if (data[index].category === "Income") {
                    if (data[index].label === "Paycheck1") {
                        $(".income-check1").val(data[index].amount);
                    }
                    if (data[index].label === "Paycheck2") {
                        $(".income-check2").val(data[index].amount);
                    }
                    if (data[index].label === "Paycheck3") {
                        $(".income-check3").val(data[index].amount);
                    }
                    if (data[index].label === "Paycheck4") {
                        $(".income-check4").val(data[index].amount);
                    }
                }
                if (data[index].category === "House") {
                    if (data[index].label === "Mortgage/Rent") {
                        $(".house-mortgage").val(data[index].amount);
                    }
                    if (data[index].label === "Electricity") {
                        $(".house-electricity").val(data[index].amount);
                    }
                    if (data[index].label === "Water") {
                        $(".house-water").val(data[index].amount);
                    }
                }
                if (data[index].category === "Miscellaneous") {
                    if (data[index].label === "Cable") {
                        $(".misc-cable").val(data[index].amount);
                    }
                    if (data[index].label === "Subscriptions") {
                        $(".misc-subscriptions").val(data[index].amount);
                    }
                    if (data[index].label === "Phone") {
                        $(".misc-phone").val(data[index].amount);
                    }
                }
                if (data[index].category === "Food") {
                    if (data[index].label === "Groceries") {
                        $(".food-groceries").val(data[index].amount);
                    }
                    if (data[index].label === "Restaurants") {
                        $(".food-restaurants").val(data[index].amount);
                    }
                }
                if (data[index].category === "Transportation") {
                    if (data[index].label === "Gas") {
                        $(".transportation-gas").val(data[index].amount);
                    }
                    if (data[index].label === "CarPayment") {
                        $(".transportation-carpayment").val(data[index].amount);
                    }
                }
            }
        } else {
            console.log("Set up data");
        }
    });
});

$(".submit-budget").on("click", function(event) {
    event.preventDefault();
    const signedInCustomer = JSON.parse(localStorage.getItem("signedInUser"));
    const signedInCustomerId = signedInCustomer.id;

    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    // Here we grab the form elements
    var budget = {
        budgetdata: [
            [
                signedInCustomerId,
                "Income",
                "Paycheck1",
                parseInt($(".income-check1").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Income",
                "Paycheck2",
                parseInt($(".income-check2").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Income",
                "Paycheck3",
                parseInt($(".income-check3").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Income",
                "Paycheck4",
                parseInt($(".income-check4").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "House",
                "Mortgage/Rent",
                parseInt($(".house-mortgage").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "House",
                "Electricity",
                parseInt($(".house-electricity").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "House",
                "Water",
                parseInt($(".house-water").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Miscellaneous",
                "Cable",
                parseInt($(".misc-cable").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Miscellaneous",
                "Subscriptions",
                parseInt($(".misc-subscriptions").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Miscellaneous",
                "Phone",
                parseInt($(".misc-phone").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Food",
                "Groceries",
                parseInt($(".food-groceries").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Food",
                "Restaurant",
                parseInt($(".food-restuarants").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Transportation",
                "CarPayment",
                parseInt($(".transportation-carpayment").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Transportation",
                "Gas",
                parseInt($(".transportation-gas").val().trim()),
                thisMonth,
                thisYear,
            ],
        ],
    };

    console.log(budget);

    // ajax call

    $.post(
        "/api/createbudget",
        budget,
        function(postResponse) {
            if (postResponse.code == "200") {
                window.location.replace("/budget");
            } else {
                //alert messages
            }
        }
        // ,
        // (err) => console.log("err")
    );
});