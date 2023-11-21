import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Avatar, Box, Button, Container, Grid, Heading, HStack, Input, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Spacer, Text, Textarea, VStack } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import { AddIcon, AtSignIcon, MinusIcon, MoonIcon, RepeatIcon, SpinnerIcon, StarIcon } from "@chakra-ui/icons"
import NextLink from "next/link"
import { DebounceInput } from "react-debounce-input"
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
  <Grid sx={{"gridTemplateColumns": "1fr 3fr 1fr", "h": "100vh", "gap": 4}}>
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
  <Link as={NextLink} href={`/myprofile`} sx={{"display": "inline-flex", "alignItems": "center", "py": 3, "px": 5, "border": "1px solid #eaeaea", "fontWeight": "semibold", "borderRadius": "full"}}>
  <AtSignIcon sx={{"mr": 2}}/>
  {`My Profile`}
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
  <Box sx={{"borderX": "3px solid #ededed", "h": "100%"}}>
  <HStack justify={`space-between`} sx={{"p": 4, "borderBottom": "3px solid #ededed"}}>
  <Heading size={`md`}>
  {`Story`}
</Heading>
  <Input onChange={(_e0) => addEvents([Event("state.home_state.set_search", {search:_e0.target.value})], (_e0), {})} placeholder={`Search`} type={`text`}/>
</HStack>
  <Grid sx={{"gridTemplateColumns": "1fr 5fr", "borderBottom": "3px solid #ededed"}}>
  <VStack sx={{"p": 4}}>
  <Avatar size={`md`}/>
</VStack>
  <Box>
  <DebounceInput debounceTimeout={50} element={Textarea} onChange={(_e0) => addEvents([Event("state.home_state.set_tweet", {value:_e0.target.value})], (_e0), {})} placeholder={`What's happening?`} sx={{"w": "100%", "border": 0, "resize": "none", "py": 4, "px": 0, "_focus": {"border": 0, "outline": 0, "boxShadow": "none"}}} value={state.home_state.tweet}/>
  <HStack justifyContent={`flex-end`} sx={{"borderTop": "1px solid #ededed", "px": 4, "py": 2}}>
  <Button onClick={(_e) => addEvents([Event("state.home_state.post_tweet", {})], (_e), {})} sx={{"bg": "rgb(0,128,0)", "color": "white", "borderRadius": "full"}}>
  {`Upload`}
</Button>
</HStack>
</Box>
</Grid>
  <Fragment>
  {isTrue(state.home_state.tweets) ? (
  <Fragment>
  {state.home_state.tweets.map((qwamqmxb, hdepvboh) => (
  <Grid key={hdepvboh} sx={{"gridTemplateColumns": "1fr 5fr", "py": 4, "gap": 1, "borderBottom": "1px solid #ededed"}}>
  <VStack>
  <Avatar name={qwamqmxb.author} size={`sm`}/>
</VStack>
  <Box>
  <Text sx={{"fontWeight": "bold"}}>
  {("@" + qwamqmxb.author)}
</Text>
  <Text sx={{"width": "100%"}}>
  {qwamqmxb.content}
</Text>
</Box>
</Grid>
))}
</Fragment>
) : (
  <Fragment>
  <VStack sx={{"p": 4}}>
  <Button onClick={(_e) => addEvents([Event("state.home_state.get_tweets", {})], (_e), {})}>
  <RepeatIcon sx={{"mr": 1}}/>
  <Text>
  {`Click to load tweets`}
</Text>
</Button>
</VStack>
</Fragment>
)}
</Fragment>
</Box>
  <VStack alignItems={`start`} sx={{"gap": 4, "h": "100%", "py": 4}}>
  <Input onChange={(_e0) => addEvents([Event("state.home_state.set_friend", {value:_e0.target.value})], (_e0), {})} placeholder={`Search users`} sx={{"width": "100%"}} type={`text`}/>
  {state.home_state.search_users.map((fjnprqhe, opdpzcfo) => (
  <VStack key={opdpzcfo} sx={{"py": 2, "width": "100%"}}>
  <HStack sx={{"width": "100%"}}>
  <Avatar name={fjnprqhe.username} size={`sm`}/>
  <Text>
  {fjnprqhe.username}
</Text>
  <Spacer/>
  <Button onClick={(_e) => addEvents([Event("state.home_state.follow_user", {username:fjnprqhe.username})], (_e), {})}>
  <AddIcon/>
</Button>
</HStack>
</VStack>
))}
  <Box sx={{"p": 4, "borderRadius": "md", "border": "1px solid #eaeaea"}}>
  <Heading size={`sm`}>
  {`Followers`}
</Heading>
  {state.home_state.followers.map((jqffycsv, gtcqdrti) => (
  <VStack key={gtcqdrti} sx={{"padding": "1em"}}>
  <HStack sx={{"width": "100%"}}>
  <Avatar name={jqffycsv.follower_username} size={`sm`}/>
  <Text>
  {jqffycsv.follower_username}
</Text>
</HStack>
</VStack>
))}
</Box>
  <Box sx={{"p": 4, "borderRadius": "md", "border": "1px solid #eaeaea", "w": "100%"}}>
  <Heading size={`sm`}>
  {`Following`}
</Heading>
  {state.home_state.following.map((iofwqizu, gqjhnivl) => (
  <VStack key={gqjhnivl} sx={{"padding": "1em"}}>
  <HStack>
  <Avatar name={iofwqizu.followed_username} size={`sm`}/>
  <Text>
  {iofwqizu.followed_username}
</Text>
  <Spacer/>
  <Button onClick={(_e) => addEvents([Event("state.home_state.unfollow_user", {username:iofwqizu.followed_username})], (_e), {})}>
  <MinusIcon/>
</Button>
</HStack>
</VStack>
))}
</Box>
</VStack>
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
