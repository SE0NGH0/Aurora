import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import "gridjs/dist/theme/mermaid.css"
import { Box, Button, Container, Grid, Heading, HStack, Image, Input, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import NextLink from "next/link"
import { AtSignIcon, InfoIcon, LinkIcon, MoonIcon, Search2Icon, StarIcon } from "@chakra-ui/icons"
import { Grid as DataTableGrid } from "gridjs-react"
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
  <Box sx={{"borderX": "3px solid #ededed", "h": "100%"}}>
  <HStack justify={`space-between`} sx={{"p": 4, "borderBottom": "3px solid #ededed"}}>
  <Heading size={`md`}>
  {`Search`}
</Heading>
  <Input onBlur={(_e0) => addEvents([Event("state.home_state.set_web_search", {value:_e0.target.value})], (_e0), {})} placeholder={`Search..`} type={`text`}/>
  <Button onClick={(_e) => addEvents([Event("state.home_state.search_all", {})], (_e), {})} sx={{"borderRadius": "1em", "boxShadow": "rgba(151, 65, 252, 0.8) 0 15px 30px -10px", "backgroundImage": "-webkit-linear-gradient(-45deg, #77e67d, #3c8552)", "boxSizing": "border-box", "color": "white", "opacity": "0.6", "_hover": {"opacity": 1}}}>
  {`Search`}
</Button>
</HStack>
  <DataTableGrid columns={state.home_state.search_df.columns} data={state.home_state.search_df.data} sx={{"fontSize": "8px"}}/>
</Box>
  <VStack alignItems={`start`} sx={{"gap": 4, "h": "100%", "py": 4}}>
  <Container sx={{"alignItems": "start", "height": "auto", "marginBottom": "5px"}}>
  <Button onClick={(_e) => addEvents([Event("state.home_state.google_crawler", {})], (_e), {})} sx={{"borderRadius": "1em", "boxShadow": "rgba(151, 65, 252, 0.8) 0 15px 30px -10px", "backgroundImage": "-webkit-linear-gradient(-45deg, #77e67d, #3c8552)", "boxSizing": "border-box", "color": "white", "opacity": "0.6", "_hover": {"opacity": 1}}}>
  {`실시간 검색어`}
</Button>
</Container>
  <VStack>
  {Object.entries(state.home_state.web_trend).map((rxyvuhaj, rekrwivp) => (
  <VStack key={rekrwivp} sx={{"align": "start", "border": "1px solid black", "borderRadius": "12px", "padding": "5px"}}>
  <Box>
  <Container sx={{"align": "start", "width": "300px", "fontWeight": "bold"}}>
  <Container>
  <Text>
  {`${rxyvuhaj[0]}위 : ${rxyvuhaj[1]}`}
</Text>
</Container>
</Container>
</Box>
</VStack>
))}
</VStack>
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