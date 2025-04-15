import { useContext } from '../context'
import { useState, useEffect } from 'react'

import { logic } from '../logic'

import { Level } from './Level'

export const EndLevelScreen = ({ level, isPassed }) => {

    //TODO two views - level is passed and level failed

    return <>
        <h1>Hello end level screen '{isPassed}'!</h1>
    </>
}