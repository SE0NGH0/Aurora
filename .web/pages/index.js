import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Avatar, Box, Button, Container, Grid, Heading, HStack, Image, Input, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Spacer, Text, Textarea, VStack } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import NextLink from "next/link"
import { AddIcon, AtSignIcon, InfoIcon, LinkIcon, MinusIcon, MoonIcon, RepeatIcon, Search2Icon, StarIcon } from "@chakra-ui/icons"
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
  <Container sx={{"maxWidth": "1600px"}}>
  <Grid sx={{"gridTemplateColumns": "1fr 4fr 1fr", "h": "100vh", "gap": 4}}>
  <Box sx={{"py": 4}}>
  <VStack alignItems={`left`} sx={{"gap": 4}}>
  <Container>
  <HStack>
  <Image src={`/aurora2.ico`} sx={{"width": "50px", "height": "30px"}}/>
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
  <Link as={NextLink} href={`/websearch`} sx={{"display": "inline-flex", "alignItems": "center", "py": 3, "px": 6, "border": "1px solid #eaeaea", "fontWeight": "semibold", "borderRadius": "full"}}>
  <Search2Icon sx={{"mr": 2}}/>
  {`Search`}
</Link>
  <Link as={NextLink} href={`/video`} sx={{"display": "inline-flex", "alignItems": "center", "py": 3, "px": 6, "border": "1px solid #eaeaea", "fontWeight": "semibold", "borderRadius": "full"}}>
  <LinkIcon sx={{"mr": 2}}/>
  {`Video`}
</Link>
  <Link as={NextLink} href={`/maps`} sx={{"display": "inline-flex", "alignItems": "center", "py": 3, "px": 6, "border": "1px solid #eaeaea", "fontWeight": "semibold", "borderRadius": "full"}}>
  <InfoIcon sx={{"mr": 2}}/>
  {`Maps`}
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
  <Box sx={{"h": "100%"}}>
  <HStack justify={`space-between`} sx={{"p": 4, "borderBottom": "3px solid #ededed"}}>
  <Heading size={`md`}>
  {`Story`}
</Heading>
  <Input onChange={(_e0) => addEvents([Event("state.home_state.set_search", {search:_e0.target.value})], (_e0), {})} placeholder={`Search..`} type={`text`}/>
</HStack>
  <Grid sx={{"gridTemplateRows": "0.5fr 0.3fr 0.5fr", "borderBottom": "3px solid #ededed"}}>
  <HStack>
  <Container sx={{"width": "10px"}}/>
  <Avatar size={`md`}/>
  <DebounceInput debounceTimeout={50} element={Textarea} onChange={(_e0) => addEvents([Event("state.home_state.set_tweet", {value:_e0.target.value})], (_e0), {})} placeholder={`What's happening?`} sx={{"w": "600px", "border": 2, "resize": "none", "py": 4, "px": 0, "_focus": {"border": 0, "outline": 0, "boxShadow": "none"}}} value={state.home_state.tweet}/>
</HStack>
  <HStack justifyContent={`flex-end`} sx={{"borderTop": "1px solid #ededed", "px": 4, "py": 2}}>
  <Button onClick={(_e) => addEvents([Event("state.home_state.handle_file_selection", {})], (_e), {})} sx={{"margin": "0", "padding": "10px", "border": "none", "_hover": {"bg": "darkgray"}, "_active": {"bg": "gray"}, "color": "white", "bg": "lightgray"}}>
  {`Select File`}
</Button>
  <Button onClick={(_e) => addEvents([Event("state.home_state.post_tweet", {})], (_e), {})} sx={{"margin-left": "auto", "borderRadius": "1em", "backgroundImage": "-webkit-linear-gradient(-45deg, #77e67d, #3c8552)", "boxSizing": "border-box", "color": "white", "opacity": "0.6", "_hover": {"opacity": 1}}}>
  {`Tweet`}
</Button>
</HStack>
  <SimpleGrid columns={[2]} spacing={`5px`}>
  {state.home_state.img.map((osyxpojo, mgeodaox) => (
  <VStack key={mgeodaox}>
  <Image src={osyxpojo}/>
  <Text>
  {osyxpojo}
</Text>
</VStack>
))}
</SimpleGrid>
</Grid>
  <Fragment>
  {isTrue(state.home_state.tweets) ? (
  <Fragment>
  {state.home_state.tweets.map((rvxvuign, kejzzthc) => (
  <Grid key={kejzzthc} sx={{"gridTemplateColumns": "1fr 5fr", "py": 4, "gap": 1, "borderBottom": "1px solid #ededed"}}>
  <VStack>
  <Avatar name={rvxvuign.author} size={`sm`}/>
</VStack>
  <Box>
  <Text sx={{"fontWeight": "bold"}}>
  {("@" + rvxvuign.author)}
</Text>
  <Text sx={{"width": "100%"}}>
  {rvxvuign.content}
</Text>
  <Fragment>
  {isTrue(rvxvuign.image_content) ? (
  <Fragment>
  {rvxvuign.image_content.split(", ").map((jtazfjxm, kmecupcc) => (
  <Image alt={`tweet image`} key={kmecupcc} src={`/${jtazfjxm}`}/>
))}
</Fragment>
) : (
  <Fragment>
  <Box/>
</Fragment>
)}
</Fragment>
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
  <Input onChange={(_e0) => addEvents([Event("state.home_state.set_friend", {value:_e0.target.value})], (_e0), {})} placeholder={`Search users..`} sx={{"width": "100%"}} type={`text`}/>
  {state.home_state.search_users.map((lrzkjmvu, swpxoudf) => (
  <VStack key={swpxoudf} sx={{"py": 2, "width": "100%"}}>
  <HStack sx={{"width": "100%"}}>
  <Avatar name={lrzkjmvu.username} size={`sm`}/>
  <Text>
  {lrzkjmvu.username}
</Text>
  <Spacer/>
  <Button onClick={(_e) => addEvents([Event("state.home_state.follow_user", {username:lrzkjmvu.username})], (_e), {})}>
  <AddIcon/>
</Button>
</HStack>
</VStack>
))}
  <Box sx={{"p": 4, "borderRadius": "md", "border": "1px solid #eaeaea"}}>
  <Heading size={`sm`}>
  {`Followers`}
</Heading>
  {state.home_state.followers.map((ylqinpdg, qzmuqbrw) => (
  <VStack key={qzmuqbrw} sx={{"padding": "1em"}}>
  <HStack sx={{"width": "100%"}}>
  <Avatar name={ylqinpdg.follower_username} size={`sm`}/>
  <Text>
  {ylqinpdg.follower_username}
</Text>
</HStack>
</VStack>
))}
</Box>
  <Box sx={{"p": 4, "borderRadius": "md", "border": "1px solid #eaeaea", "w": "100%"}}>
  <Heading size={`sm`}>
  {`Following`}
</Heading>
  {state.home_state.following.map((rbnqfpnt, zcpoierz) => (
  <VStack key={zcpoierz} sx={{"padding": "1em"}}>
  <HStack>
  <Avatar name={rbnqfpnt.followed_username} size={`sm`}/>
  <Text>
  {rbnqfpnt.followed_username}
</Text>
  <Spacer/>
  <Button onClick={(_e) => addEvents([Event("state.home_state.unfollow_user", {username:rbnqfpnt.followed_username})], (_e), {})}>
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
