let graph = document.getElementById("chart1");
let graph2 = document.getElementById("chart2");
let graph3 = document.getElementById("chart3");
var opts2 = {
    series: [],
    colors: ['#F4D03F', '#E91E63', '#9C27B0'],
    stroke: {
        width: 4,
    },
    chart: {
        type: 'line',
        height: 450,
        width: "99%",
        zoom: {
            autoScaleYaxis: true
        },
        redrawOnParentResize: true,
    },





    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0,
        style: 'hollow',
    },
    xaxis: {
        type: 'datetime',
        tickAmount: 10,
        labels: {
            style: {
                fontFamily: '"Space Mono", monospace',
                fontWeight: undefined,
                colors: "gray"
            }
        }
    },
    yaxis: {
        forceNiceScale: true,
        decimalsInFloat: 2,
        lines: {
            show: true
        },
        opposite: false,
        tickAmount: 10,
        labels: {
            offsetX: -10,
            offsetY: 2,
            rotate: 0,
            style: {
                fontFamily: '"Space Mono", monospace',
                fontWeight: undefined,
                colors: "gray"
            }
        },
        tooltip: {
            enabled: true,
            shared: true
        }

    },
    tooltip: {
        x: {
            show: true,
            format: 'hh:mm - dd MMM yyyy'
        },
    },
    grid: {
        show: true,
        borderColor: '#90A4AE',
        strokeDashArray: 10,
        position: 'back',
        xaxis: {
            lines: {
                show: true
            }
        },
        row: {
            colors: undefined,
            opacity: 0.9
        },
        column: {
            colors: undefined,
            opacity: 0.9
        },
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
    },

    noData: {
        text: "Select Presets",
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
            fontFamily: '"Space Mono", monospace',
            fontWeight: undefined,
            colors: "lightgray"
        }
    },
    plotOptions: {
        candlestick: {
            wick: {
                useFillColor: true,
            }
        }
    },
}

var chart = new ApexCharts(
    document.querySelector("#chart1"),
    opts2
);
chart.render();

var chart2 = new ApexCharts(
    document.querySelector("#chart2"),
    opts2
);
chart2.render();

var chart3 = new ApexCharts(
    document.querySelector("#chart3"),
    opts2
);
chart3.render();

var chart4 = new ApexCharts(
    document.querySelector("#chart4"),
    opts2
);
chart4.render();

var chart5 = new ApexCharts(
    document.querySelector("#chart5"),
    opts2
);
chart5.render();

function get_chart_fps_luna_supply(data) {

    var options = {
        series: [{
            name: `LUNA Circulating Supply`,
            data: data,
            type: 'line',
            title: {
                text: `some text`,
            },
        }],
        title: {
            text: "LUNA Circulating Supply",
            style: {
                fontFamily: '"Space Mono", monospace',
                fontWeight: undefined,
                colors: "lightgray"
            }
        },
        chart: {
            zoom: {
                autoScaleYaxis: true
            },
            redrawOnParentResize: true
        },

        xaxis: {
            type: 'datetime',
        },
    };

    chart.updateOptions(options);
};

function get_chart_fps_ust_supply(data) {

    var options = {
        series: [{
            name: `UST Circulating Supply`,
            data: data,
            type: 'line',
            title: {
                text: `some text`,
            },
        }],
        title: {
            text: "UST Circulating Supply",
            style: {
                fontFamily: '"Space Mono", monospace',
                fontWeight: undefined,
                colors: "lightgray"
            }
        },
        chart: {
            zoom: {
                autoScaleYaxis: true
            },
            redrawOnParentResize: true
        },

        xaxis: {
            type: 'datetime',
        },
    };

    chart2.updateOptions(options);
};

function get_chart_fps_ratio(data) {

    var options = {
        series: [{
            name: `LUNA/UST Diff Circ Supply Ratio`,
            data: data,
            type: 'line',
            title: {
                text: `some text`,
            },
        }],
        title: {
            text: "LUNA Circulating Supply diff / UST Circulating Supply Diff",
            style: {
                fontFamily: '"Space Mono", monospace',
                fontWeight: undefined,
                colors: "lightgray"
            }
        },
        chart: {
            zoom: {
                autoScaleYaxis: true
            },
            redrawOnParentResize: true
        },
        xaxis: {
            type: 'datetime',
        },
    };

    chart3.updateOptions(options);
};

function get_chart_fps_daily(data) {

    var options = {
        series: [{
            name: `Terra Daily TX Count`,
            data: data,
            type: 'line',
            title: {
                text: `some text`,
            },
        }],
        title: {
            text: "Terra Daily TX Count",
            style: {
                fontFamily: '"Space Mono", monospace',
                fontWeight: undefined,
                colors: "lightgray"
            }
        },
        chart: {
            zoom: {
                autoScaleYaxis: true
            },
            redrawOnParentResize: true
        },
        xaxis: {
            type: 'datetime',
        },
    };

    chart4.updateOptions(options);
};

function get_chart_fps_daily2(data) {

    var options = {
        series: [{
            name: `Terra Daily Active Unique Addresses`,
            data: data,
            type: 'line',
            title: {
                text: `some text`,
            },
        }],
        title: {
            text: "Terra Daily Active Unique Addresses",
            style: {
                fontFamily: '"Space Mono", monospace',
                fontWeight: undefined,
                colors: "lightgray"
            }
        },
        chart: {
            zoom: {
                autoScaleYaxis: true
            },
            redrawOnParentResize: true
        },
        xaxis: {
            type: 'datetime',
        },
    };

    chart5.updateOptions(options);
};


function get_data_fps() {
    const flipside_url = 'https://api.flipsidecrypto.com/api/v2/queries/a7f7550b-21ba-4121-8dec-67a46f94a276/data/latest'
    fetch(flipside_url).then(function (response) {
        return response.json();
    }).then(function (data) {
        var dataset = prepare_data_fps_ratio(data);
        var dataset2 = prepare_data_fps_ust_supply(data);
        var dataset3 = prepare_data_fps_luna_supply(data);
        get_chart_fps_ratio(dataset);
        get_chart_fps_ust_supply(dataset2);
        get_chart_fps_luna_supply(dataset3);
    }).catch(function (err) {
        console.warn(`Error ${err}`);
    });
};

function get_data_fps2() {
    const flipside_url = 'https://api.flipsidecrypto.com/api/v2/queries/bfba12dc-34bc-42e9-bf35-8ad28ebaee32/data/latest'
    fetch(flipside_url).then(function (response) {
        return response.json();
    }).then(function (data) {
        var dataset = prepare_data_fps_daily(data);
        var dataset2 = prepare_data_fps_daily2(data);
        get_chart_fps_daily(dataset);
        get_chart_fps_daily2(dataset2);
    }).catch(function (err) {
        console.warn(`Error ${err}`);
    });
};

function prepare_data_fps_ratio(data) {
    let dataset = []
    for (let i = 0; i < data.length; i++) {
        let date_ = Math.floor(new Date(data[i]["DATE"]).getTime())
        if (data[i]["LUNA_UST_DIFF_RATIO"] !== null | data[i]["LUNA_UST_DIFF_RATIO"] === undefined) {
            let c_p = [
                date_, data[i]["LUNA_UST_DIFF_RATIO"].toFixed(1)
            ]
        }
        let c_p = [
            date_, data[i]["LUNA_UST_DIFF_RATIO"]
        ]


        dataset.push(c_p)
    }
    return dataset;
}

function prepare_data_fps_daily(data) {
    let dataset = []
    for (let i = 0; i < data.length; i++) {
        let date_ = Math.floor(new Date(data[i]["TERRA_DATE"]).getTime())
        if (data[i]["TXN_COUNT"] !== null | data[i]["TXN_COUNT"] === undefined) {
            let c_p = [
                date_, data[i]["TXN_COUNT"].toFixed(1)
            ]
        }
        let c_p = [
            date_, data[i]["TXN_COUNT"]
        ]


        dataset.push(c_p)
    }
    return dataset;
}

function prepare_data_fps_daily2(data) {
    let dataset = []
    for (let i = 0; i < data.length; i++) {
        let date_ = Math.floor(new Date(data[i]["TERRA_DATE"]).getTime())
        if (data[i]["ACTIVE_UNIQUE_ADDRESSES"] !== null | data[i]["ACTIVE_UNIQUE_ADDRESSES"] === undefined) {
            let c_p = [
                date_, data[i]["ACTIVE_UNIQUE_ADDRESSES"].toFixed(1)
            ]
        }
        let c_p = [
            date_, data[i]["ACTIVE_UNIQUE_ADDRESSES"]
        ]


        dataset.push(c_p)
    }
    return dataset;
}

function prepare_data_fps_ust_supply(data) {
    let dataset = []
    for (let i = 0; i < data.length; i++) {
        let date_ = Math.floor(new Date(data[i]["DATE"]).getTime())
        if (data[i]["DIFF_UST_SUPPLY"] !== null | data[i]["DIFF_UST_SUPPLY"] === undefined) {
            let c_p = [
                date_, data[i]["UST_SUPPLY"].toFixed(1)
            ]
        }
        let c_p = [
            date_, data[i]["UST_SUPPLY"]
        ]


        dataset.push(c_p)
    }
    return dataset;
}

function prepare_data_fps_luna_supply(data) {
    let dataset = []
    for (let i = 0; i < data.length; i++) {
        let date_ = Math.floor(new Date(data[i]["DATE"]).getTime())
        if (data[i]["DIFF_LUNA_SUPPLY"] !== null | data[i]["DIFF_LUNA_SUPPLY"] === undefined) {
            let c_p = [
                date_, data[i]["LUNA_SUPPLY"].toFixed(1)
            ]
        }
        let c_p = [
            date_, data[i]["LUNA_SUPPLY"]
        ]


        dataset.push(c_p)
    }
    return dataset;
}

get_data_fps();
get_data_fps2();