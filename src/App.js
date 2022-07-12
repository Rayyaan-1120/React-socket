import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Image,
  Grid,
  theme,
  HStack,
  Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import {AiFillLike} from 'react-icons/ai'
import io from 'socket.io-client'

let ENDPOINT = 'http://localhost:5000/'
let socket;

function App() {

  

  const [color,setcolor] = useState(false)
  const [likecount,setlikecount] = useState(0)

  

  useEffect(() => {
    socket = io(ENDPOINT,{
      transports:['websocket']
    })

    socket.emit('join_room','newroom')
  },[])

  useEffect(() => {
    // color ? setlikecount((prev) => prev + 1) : setlikecount((prev) => prev === 0 ? 0 : prev - 1)
   if(color){
    socket.emit('sendlikes',1)
   }else{
    if(likecount !== 0){
      socket.emit('sendlikes',-1)
    }
   }
  //  else{
    // socket.emit('sendlikes',-1)
  //  }    
  } ,[color])

  // useEffect(() => {
  //   socket.emit('sendlikes',likecount)
  // },[color])


  useEffect(() => {
    socket.on('increase like count',(data) => {
        setlikecount(data)
    })
  })

  // useef

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Grid minH="100vh" p={3} bg={'gray.300'} _dark={{bg:"gray.800"}} >
          <ColorModeSwitcher position="absolute" right={5} top={5} />
          <Box bg={'gray.200'} _dark={{bg:"gray.700"}} minW={'280px'} justifySelf="center" alignSelf={'center'} minH={'350px'}  maxW={'100%'}   borderRadius={8} >
            <Box w={'100%'} my={1} p={2} display="flex" flexDir="row" alignItems={'center'}>
              <Box
              borderColor={'teal.400'}
              borderWidth={2.8}
              borderRadius="full"
              >
              <Image 
               src={require('../src/images/image.jpg')}
               borderRadius={'full'}
               w={50}
               h={50}
               
              />
              </Box>
              <Box ml={1.5}>
              <Text fontSize={14} fontWeight="500" fontFamily="Open Sans">Rayyaan Nauman</Text>
              <Text mt={1} fontSize={10} fontWeight="400" fontFamily="Open Sans">{new Date().getHours() + ':' + new Date().getMinutes()}</Text>
              </Box>
            </Box>
            <Box mt={1}>
              <Text mt={1} fontSize={15} ml={1} fontWeight="400" p={1} fontFamily="Open Sans">What a nice wallpaper</Text>
              
               <Image 
                src={require('../src/images/postimage.png')}
                w={'100%'}
                h={'220'}
                objectFit="contain"
               />
            </Box>
            <Box display={'flex'}  w="100%" alignItems="center" my={1} py={1}>
            <Button
            onClick={() => {
             setcolor(!color)
             
            }}
            alignItems={'center'} justifyContent="center" ml={3}  my={1} py={1} display="flex" cursor={'pointer'}>
                 <AiFillLike size={20} color={color && 'Highlight'}/>
                 <Text fontSize={15} fontWeight="400" p={1} fontFamily="Open Sans" color={color && 'Highlight'}>Like</Text>
            </Button>
            <Text fontSize={16} ml={1} fontWeight="600" p={1} fontFamily="Open Sans">{likecount}</Text>
            </Box>
          </Box>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
