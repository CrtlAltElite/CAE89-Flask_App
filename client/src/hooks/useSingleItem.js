import {useEffect, useState} from 'react'
import apiItem from '../api/apiItem'
import { CancelToken } from 'apisauce'


export default function useSingleItem(itemId) {
  const [item, setItem] = useState([])

  useEffect(
    ()=>{
      let source;
      (async()=>{
        source=CancelToken.source()
        const response = await apiItem.getItem(itemId,source.token)
        setItem(response)
      })()
      return()=>{source.cancel()}

    }
    ,[itemId]
  )

  return item
}
