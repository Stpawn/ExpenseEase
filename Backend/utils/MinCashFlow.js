function getMin(arr) {
    let minInd = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[minInd]) minInd = i;
    }
    return minInd;
}

function getMax(arr) {
    let maxInd = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > arr[maxInd]) maxInd = i;
    }
    return maxInd;
}

function minOf2(x, y) {
    return x < y ? x : y;
}

function minCashFlowRec(amount) {
    const mxCredit = getMax(amount);
    const mxDebit = getMin(amount);

    if (amount[mxCredit] === 0 && amount[mxDebit] === 0) return [];

    const min = minOf2(-amount[mxDebit], amount[mxCredit]);
    amount[mxCredit] -= min;
    amount[mxDebit] += min;

    const transaction = { from: mxDebit, to: mxCredit, amount: min };
    return [transaction, ...minCashFlowRec(amount)];
}

function minCashFlow(graph) {
    const N = graph.length;
    const amount = Array(N).fill(0);

    for (let p = 0; p < N; p++) {
        for (let i = 0; i < N; i++) {
            amount[p] += graph[i][p] - graph[p][i];
        }
    }

    return minCashFlowRec(amount);
}

module.exports = minCashFlow;