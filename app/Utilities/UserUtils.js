
const CALL_THRESHOLD = 15;

export function getScore(user) {
    let score = 0;
    const flatCalls = getFlatCalls(user);
    const start = 256;
    flatCalls.forEach((call)=>{
        score += start / (Math.pow(2, call.distance));
    });
    return score;
}

export function getFlatCalls(user) {
    return flatCalls(user, 0)
}

export function getPersonalCallsCount(user) {
    if (user.calls) {
        return user.calls.filter((call)=>call.duration>=CALL_THRESHOLD).length;
    }
    return 0;
}

function flatCalls(user, distance) {
    const children = user.children || [];
    const userCalls = user.calls || [];
    const callsWithDist = userCalls.map((call)=>{
            call.distance = distance;
            return call;
    }).filter((call=>call.duration>=CALL_THRESHOLD));
    const childrensCalls = children.map((child)=> {
        return flatCalls(child, distance+1);
    });
    return callsWithDist.concat(...childrensCalls);
}

export function countStates(user) {
    const flatCalls = getFlatCalls(user);
    const states = [];
    flatCalls.forEach((call) => {
        if (states.indexOf(call.state) === -1) {
            states.push(call.state);
        }
    });
    return states.length;

}

export function getStates (user) {
    const flatCalls = getFlatCalls(user);
    const states = [];
    flatCalls.forEach((call)=>{
        if (states.indexOf(call.state)==-1){
            states.push(call.state);
        }
    })
    return states;
}

export function getStatesArcs(user) {
    const arcs = [];
    const origin = user.state || false;
    const children = user.children || [];
    children.forEach((child)=>{
        const destination = child.state;
        if (origin && destination && destination!==origin) {
            arcs.push({'origin':origin, 'destination':destination})
        }
    })
    const childrensArcs = children.map((child)=>{
        return getStatesArcs(child);
    })
    return arcs.concat(...childrensArcs);
}

export function flattenUser(user) {
    const result = [];
    const children = user.children || [];
    children.forEach((child)=>{
        let userStates = getStates(child);
        result.push({'user':child, 'states':userStates, 'statesCount': userStates.length, 'score':getScore(child) });
    });
    const childrenUsers = children.map((child)=>{
        return flattenUser(child);
    });
    return result.concat(...childrenUsers);
}

export function flattenLeaders(users) {
    const result = [];
    users.forEach((user)=>{
        let userStates = getStates(user);
        result.push({'user':user, 'states':userStates, 'statesCount': userStates.length, 'score':getScore(user) });
        result.push.apply(result, flattenUser(user))
    });
    return result;
}