import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Avatar, Box, Button, Container, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Grid, Heading, HStack, Input, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Spacer, Text, VStack } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import { AddIcon, ArrowLeftIcon, MinusIcon, MoonIcon, SpinnerIcon, StarIcon } from "@chakra-ui/icons"
import NextLink from "next/link"
import NextHead from "next/head"



export default function Component() {
  const state = useContext(StateContext)
  const router = useRouter()
  const [ colorMode, toggleColorMode ] = useContext(ColorModeContext)
  const focusRef = useRef();
  
  // Main event loop.
  const [addEvents, connectError] = useContext(EventLoopContext)

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => addEvents(initialEvents())
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])


  return (
    <Fragment>
  <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {getEventURL().href}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  <Container sx={{"maxWidth": "1300px"}}>
  <Grid sx={{"gridTemplateColumns": "1fr 3.5fr 0.5fr", "h": "100vh", "gap": 4}}>
  <Box sx={{"py": 4}}>
  <VStack alignItems={`left`} sx={{"gap": 4}}>
  <Container>
  <HStack>
  <SpinnerIcon sx={{"mr": 2, "color": "green"}}/>
  <Text sx={{"fontSize": "25px", "fontWeight": "bolder", "fontFamily": "Open Sans,Sans-serif", "background": "-webkit-linear-gradient(-45deg, #77e67d, #3c8552)", "-webkit-background-clip": "text", "color": "transparent", "centerContent": true}}>
  {`Aurora`}
</Text>
</HStack>
</Container>
  <Link as={NextLink} href={`/`} sx={{"display": "inline-flex", "alignItems": "center", "py": 3, "px": 6, "border": "1px solid #eaeaea", "fontWeight": "semibold", "borderRadius": "full"}}>
  <StarIcon sx={{"mr": 2}}/>
  {`Home`}
</Link>
  <Button onClick={toggleColorMode}>
  <MoonIcon/>
</Button>
  <Button onClick={(_e) => addEvents([Event("state.logout", {})], (_e), {})}>
  {`Log out`}
</Button>
  <Container sx={{"height": "200px"}}/>
</VStack>
</Box>
  <Box>
  <HStack justify={`space-between`} sx={{"p": 4, "borderBottom": "1px solid #ededed"}}>
  <Heading size={`md`}>
  {`Story`}
</Heading>
  <Input onChange={(_e0) => addEvents([Event("state.home_state.set_search", {search:_e0.target.value})], (_e0), {})} placeholder={`Search`} type={`text`}/>
</HStack>
  <Grid>
  <HStack sx={{"p": 4}}>
  <Avatar size={`md`}/>
  <Text sx={{"size": "md", "fontSize": "18px", "fontWeight": "bold"}}>
  {state.auth_state.username}
</Text>
</HStack>
</Grid>
</Box>
  <Box>
  <VStack>
  <Container sx={{"height": "8px"}}/>
  <Container>
  <Button>
  <ArrowLeftIcon onClick={(_e) => addEvents([Event("state.home_state.right", {})], (_e), {})}/>
</Button>
</Container>
  <Drawer isOpen={state.home_state.show_right}>
  <DrawerOverlay>
  <DrawerContent sx={{"bg": "rgba(100, 100, 100, 0.7)"}}>
  <DrawerHeader>
  <Input onChange={(_e0) => addEvents([Event("state.home_state.set_friend", {value:_e0.target.value})], (_e0), {})} placeholder={`Search users`} sx={{"width": "100%"}} type={`text`}/>
  {state.home_state.search_users.map((oyijuptq, xpawibhn) => (
  <VStack key={xpawibhn} sx={{"py": 2, "width": "100%"}}>
  <HStack sx={{"width": "100%"}}>
  <Avatar name={oyijuptq.username} size={`sm`}/>
  <Text>
  {oyijuptq.username}
</Text>
  <Spacer/>
  <Button onClick={(_e) => addEvents([Event("state.home_state.follow_user", {username:oyijuptq.username})], (_e), {})}>
  <AddIcon/>
</Button>
</HStack>
</VStack>
))}
</DrawerHeader>
  <DrawerBody sx={{"alignItems": "start", "gap": 4, "h": "100%", "py": 4}}>
  <Box sx={{"p": 4, "borderRadius": "md", "border": "1px solid #eaeaea"}}>
  <Heading size={`sm`}>
  {`Followers`}
</Heading>
  {state.home_state.followers.map((vebexhso, ashseydh) => (
  <VStack key={ashseydh} sx={{"padding": "1em"}}>
  <HStack sx={{"width": "100%"}}>
  <Avatar name={vebexhso.follower_username} size={`sm`}/>
  <Text>
  {vebexhso.follower_username}
</Text>
</HStack>
</VStack>
))}
</Box>
  <Container sx={{"height": "8px"}}/>
  <Box sx={{"p": 4, "borderRadius": "md", "border": "1px solid #eaeaea", "w": "100%"}}>
  <Heading size={`sm`}>
  {`Following`}
</Heading>
  {state.home_state.following.map((dozjmbft, zkovoaks) => (
  <VStack key={zkovoaks} sx={{"padding": "1em"}}>
  <HStack>
  <Avatar name={dozjmbft.followed_username} size={`sm`}/>
  <Text>
  {dozjmbft.followed_username}
</Text>
  <Spacer/>
  <Button onClick={(_e) => addEvents([Event("state.home_state.unfollow_user", {username:dozjmbft.followed_username})], (_e), {})}>
  <MinusIcon/>
</Button>
</HStack>
</VStack>
))}
</Box>
</DrawerBody>
  <DrawerFooter>
  <Button onClick={(_e) => addEvents([Event("state.home_state.right", {})], (_e), {})}>
  {`Close`}
</Button>
</DrawerFooter>
</DrawerContent>
</DrawerOverlay>
</Drawer>
</VStack>
</Box>
</Grid>
</Container>
  <NextHead>
  <title>
  {`Reflex App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
