import * as actionTypes from './actionTypes'



export const getIntro=(data)=>({
    type:actionTypes.INTRO,
    data
})


export const getProgress=(data)=>({
type:actionTypes.PROGRESS,
data
})

export const getLang =(data)=>({
    type:actionTypes.GETLANG,
    data
})

export const updateLang =(data)=>({
    type:actionTypes.UPDATELANG,
    data
})


export const getSelecctLang=(data)=>({
    type:actionTypes.SELECTLANG,
    data
})

export const getReal=(data)=>({
    type:actionTypes.SELECTREAL,
    data
})

export const userSelect=(data)=>({
    type:actionTypes.USERSELECT,
    data
})

export const getFtoken=(data)=>({
    type:actionTypes.FTOKEN,
    data
})

export const getProposalList=(data)=>({
type:actionTypes.PROPOSAL,
data
})
