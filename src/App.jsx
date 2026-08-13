
import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HeroStats from './components/HeroStats'
import MarketplaceFeed from './components/MarketplaceFeed'
import ProfilePage from './components/ProfilePage'
import FaqPage from './components/FaqPage'
import SchoolPage from './components/SchoolPage'
import Footer from './components/Footer'
import ReviewModal from './components/ReviewModal'

import { polygon, polygonAmoy } from "wagmi/chains"
import Web3 from "web3"

import { useAccount, useWriteContract } from "wagmi"
import { useSwitchChain } from "wagmi"

import {
  token_abi,
  USDT_address,
  contract_address,
  contract_abi,
} from "../src/components/configs/Contracts"
// import { letterSpacing } from 'html2canvas/dist/types/css/property-descriptors/letter-spacing'


const REVIEW_MODAL_DISMISSED_KEY = 'reviewModalDismissed'

// ============================================================
// REFRESH SETTINGS
// ============================================================

// How many already-loaded orders are refreshed in one batch
const REFRESH_BATCH_SIZE = 10

// Refresh loaded orders every 20 seconds
const REFRESH_INTERVAL = 20000


export default function App() {

  const [page, setPage] = useState('home')
  const [showReviewModal, setShowReviewModal] = useState(false)

  // ============================================================
  // MARKETPLACE ORDERS
  // ============================================================

  const [allorders, set_allorders] = useState([])

  const [totalOrder, setTotalOrder] = useState(null)
  const [myCompletedOrders, setMyCompletedOrders] = useState([])
  const [myUnlockedOrders, setMyUnlockedOrders] = useState([])
  const [myLockedOrders, setMyLockedOrders] = useState([])
  const [myChoosedOrders, setMyChoosedOrders] = useState([])

  const [totalBusiness, setTotalBusiness] = useState(null)
  const [totalUsers, setTotalUsers] = useState(null)
  const [currHalvingPhase, setCurrHalvingPhase] = useState(null)
  const [CurrHalvingData, setCurrHalvingData] = useState(null)

  const [boostCharges, setBoostCharges] = useState(null)
  const [letterBypassCharges, setLetterBypassCharges] = useState(null)
  const [marketDay, setMarketDay] = useState(null)
  const [user, setUser] = useState(null)

  const [isBlackListed, setIsBlackListed] = useState(false)
  const [isSuspended, setIsSuspended] = useState(false)

  const [outflowVelocityCheck, setOutflowVelocityCheck] = useState(null)
  const [totalSuspension, setTotalSuspension] = useState(null)

  const [
    total_Curr_market_seeking_ph,
    settotal_Curr_market_seeking_ph
  ] = useState(null)

  const [myLastOrder, set_myLastOrder] = useState([])

  const [SpeedStarOrders, setSpeedStarOrders] = useState([])
  const [small_orders, set_small_orders] = useState([])
  const [big_orders, set_big_orders] = useState([])
  const [exit_orders, set_exit_orders] = useState([])
  const [myTeam_orders, set_myTeam_orders] = useState([])

  
  const [refData, ser_refData] = useState([])
  const [userName, setUserName] = useState("")
  const [currTime, set_currTime] = useState(0)

  
  // ============================================================
  // MARKETPLACE CURSOR PAGINATION
  // ============================================================

  const [feedListType, setFeedListType] = useState(0)
  const [feedCursor, setFeedCursor] = useState(0)
  const [hasMoreOrders, setHasMoreOrders] = useState(true)
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [initialOrdersLoaded, setInitialOrdersLoaded] = useState(false)

  // ============================================================
  // REFRESH STATE
  // ============================================================

  const [refreshingOrders, setRefreshingOrders] = useState(false)

  // This tells us which loaded orders should be refreshed next
  const [refreshStartIndex, setRefreshStartIndex] = useState(0)


  const [referral, setReferral] = useState(
    "0x0000000000000000000000000000000000000000"
  )


  const { isDisconnected } = useAccount()
  const { address } = useAccount()


  const { switchChainAsync } = useSwitchChain()
  const { writeContractAsync } = useWriteContract()


  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {

    handle_orders_feed(true)

    const refer =
      new URLSearchParams(window.location.search).get("ref")

    if (refer) {
      setReferral(refer)
    }

  }, [])


  // ============================================================
  // USER DATA
  // ============================================================

  useEffect(() => {

    if (address != null) {
      handlePH()
    }

  }, [address])


  // ============================================================
  // REVIEW MODAL
  // ============================================================

  useEffect(() => {

    if (myLastOrder != null) {

      if (myLastOrder.remaining_amount == 0 && !myLastOrder.letter) {
        setShowReviewModal(true)
      }

    }

  }, [myLastOrder])


  function handleNavClick(link) {

    if (link === 'FAQs') {
      setPage('faq')
    }

    else if (link === 'School') {
      setPage('school')
    }

    else if (link === 'Home') {
      setPage('home')
    }

  }


  function closeReviewModal() {
    setShowReviewModal(false)
  }


  function handleReviewLater() {
    sessionStorage.setItem(
      REVIEW_MODAL_DISMISSED_KEY,
      '1'
    )
  }


  function handleReviewSubmit({ rating, review }) {

    sessionStorage.setItem(
      REVIEW_MODAL_DISMISSED_KEY,
      '1'
    )

    console.log('Review submitted:', {
      rating,
      review
    })

  }


  const [usdt_balance, set_usdtBalance] = useState(0)


  // ============================================================
  // HANDLE USER / GENERAL CONTRACT DATA
  // ============================================================

  const handlePH = async () => {

    if (isDisconnected) {
      alert("kindly connect your wallet")
      return
    }

    try {
      // const web3 =
      //   new Web3(
      //     new Web3.providers.HttpProvider(
      //       "https://poly.api.pocket.network"
      //     )
      //   )
      const web3 =
        new Web3(
          new Web3.providers.HttpProvider(
            "https://bsc-rpc.publicnode.com"
          )
        )
      const contract_usdt =
        new web3.eth.Contract(
          token_abi,
          USDT_address
        )

      const contract =
        new web3.eth.Contract(
          contract_abi,
          contract_address
        )

      const usdt_balance =
        await contract_usdt.methods
          .balanceOf(address)
          .call()

      const totalBusiness =
        await contract.methods
          .totalbusiness()
          .call()

      const totalUsers =
        await contract.methods
          .totalusers(address)
          .call()

      const total_Curr_market_seeking_ph =
        await contract.methods
          .total_Curr_market_seeking_ph()
          .call()

      const boostCharges =
        await contract.methods
          .boost_charges(address)
          .call()

      const letterBypassCharges =
        await contract.methods
          .letter_bypass_charges(address)
          .call()

      const curr_day =
        await contract.methods
          .find_curr_day()
          .call()

      const marketDay =
        await contract.methods
          .market_day(curr_day)
          .call()

      const user =
        await contract.methods
          .user(address)
          .call()

      const userName =
        await contract.methods
          .user_name(address)
          .call()

      const isBlackListed =
        await contract.methods
          .isBlackListed(address)
          .call()

      const isSuspended =
        await contract.methods
          .isSuspended(address)
          .call()

      const outflowVelocityCheck =
        await contract.methods
          .outflow_velocity_check(address)
          .call()

      const totalSuspension =
        await contract.methods
          .total_suspension(address)
          .call()

      const my_orders =
        await contract.methods
          .get_userOrders(address)
          .call()
          const myTeam_orders =
          await contract.methods
            .getDirectUnlockedFeed(address)
            .call()
          let choosed_order;
          if(user.choosed_ph_no>0)
          {
             choosed_order =
            await contract.methods
              .order(Number(user.choosed_ph_no))
              .call()
          }

  
      const refData =
        await contract.methods
          .get_refData(address)
          .call()


      let my_lockedOrders = []
      let my_choosedOrders = []
      let myCompletedOrders = []

      let my_lastorder


      const latestBlock = 
        await web3.eth.getBlock("latest")

      const curr_time =
        Number(latestBlock.timestamp)


      for (
        let i = 0;
        i < my_orders.length;
        i++
      ) {

        if (
          my_orders[i].seeker === address
        ) {
          if (
            user.unlocked_ph_no ==
            my_orders[i].no
          ) {

            my_lastorder =
              my_orders[i]

          }

          if (
            Number(my_orders[i].remaining_amount) > 0
          ) {

            my_lockedOrders.push(
              my_orders[i]
            )

          }
          if (
            Number(my_orders[i].remaining_amount) == 0
          ) {

            myCompletedOrders.push(
              my_orders[i]
            )

          }

          // if (
          //   user.unlocked_ph_no ==
          //   my_orders[i].no
          // ) {

          //   my_lastorder =
          //     my_orders[i]

          // }

        }



      }

      if ( user.choosed_ph_no != 0  && (curr_time - Number(choosed_order.choosed_time)) < 7200)
      {


        my_choosedOrders.push(choosed_order)
        my_choosedOrders[0].no=  Number(user.choosed_ph_no);
        console.log(my_choosedOrders)

      }


      if (
        user.upliner !=
        "0x0000000000000000000000000000000000000000"
      ) {

        setReferral(
          user.upliner
        )

      }
      setMyCompletedOrders(myCompletedOrders)
      setMyChoosedOrders(my_choosedOrders)
      setMyLockedOrders(
        my_lockedOrders
      )

      set_myTeam_orders(myTeam_orders)
      set_myLastOrder(
        my_lastorder
      )
console.log(curr_time)
      settotal_Curr_market_seeking_ph(
        total_Curr_market_seeking_ph
      )

      setTotalBusiness(
        totalBusiness
      )

      setTotalUsers(
        totalUsers
      )
      setUserName(
        userName
      )

      ser_refData(
        refData
      )

      setBoostCharges(
        boostCharges
      )

      setLetterBypassCharges(
        letterBypassCharges
      )

      setMarketDay(
        marketDay
      )

      setUser(
        user
      )

      setIsBlackListed(
        isBlackListed
      )

      setIsSuspended(
        isSuspended
      )

      setOutflowVelocityCheck(
        outflowVelocityCheck
      )

      setTotalSuspension(
        totalSuspension
      )

      set_usdtBalance(
        usdt_balance
      )

      set_currTime(curr_time)

    }

    catch (error) {

      console.error(
        "handlePH error:",
        error
      )

    }

  }


  // ============================================================
  // MARKETPLACE FEED
  //
  // THIS IS STILL YOUR INFINITE SCROLL.
  // ============================================================

  const handle_orders_feed = async (
    isInitial = false
  ) => {

    if (loadingOrders) {
      return
    }


    if (
      !isInitial &&
      !hasMoreOrders
    ) {
      return
    }


    try {

      setLoadingOrders(true)


      // const web3 =
      //   new Web3(
      //     new Web3.providers.HttpProvider(
      //       "https://poly.api.pocket.network"
      //     )
      //   )
        const web3 =
        new Web3(
          new Web3.providers.HttpProvider(
            "https://bsc-rpc.publicnode.com"
          )
        )

      const contract =
        new web3.eth.Contract(
          contract_abi,
          contract_address
        )


      const listType =
        isInitial
          ? 0
          : feedListType


      const cursor =
        isInitial
          ? 0
          : feedCursor


      const result =
        await contract.methods
          .marketplaceFeed(
            listType,
            cursor,
            10
          )
          .call()


      const feed =
        result.feed ||
        result[0] ||
        []


      const nextList =
        Number(
          result.nextList !== undefined
            ? result.nextList
            : result[1]
        )


      const nextCursor =
        Number(
          result.nextCursor !== undefined
            ? result.nextCursor
            : result[2]
        )


      const hasMore =
        Boolean(
          result.hasMore !== undefined
            ? result.hasMore
            : result[3]
        )


      console.log(
        "Marketplace response:",
        {
          feed,
          nextList,
          nextCursor,
          hasMore
        }
      )


      const latestBlock =
        await web3.eth.getBlock(
          "latest"
        )


      const curr_time =
        Number(
          latestBlock.timestamp
        )


      const temp = []

      const speedstar_orders = []
      const small_orders = []
      const big_orders = []
      const exit_orders = []


      for (
        let i = 0;
        i < feed.length;
        i++
      ) {

        const currentOrder =
          feed[i]


        const remainingAmount =
          BigInt(
            currentOrder.remaining_amount ||
            0
          )


        const choosedTime =
          Number(
            currentOrder.choosed_time ||
            0
          )


        const isUnlocked =
          currentOrder.is_unlocked === true ||
          currentOrder.is_unlocked === "true"


        if (
          remainingAmount > 0n &&
          (
            curr_time -
            choosedTime
          ) > 7200 &&
          isUnlocked
        ) {

          temp.push(
            currentOrder
          )


          if (
            BigInt(
              currentOrder.exit_fee ||
              0
            ) > 0n
          ) {

            exit_orders.push(
              currentOrder
            )

          }

          else if (
            BigInt(
              currentOrder.speedstar_time ||
              0
            ) > 0n
          ) {

            speedstar_orders.push(
              currentOrder
            )

          }

          else if (
            remainingAmount <
            100000000000000000000n
          ) {

            small_orders.push(
              currentOrder
            )

          }

          else {

            big_orders.push(
              currentOrder
            )

          }

        }

      }


      // ========================================================
      // APPEND NEW ORDERS
      // ========================================================

      if (isInitial) {

        set_allorders(
          temp
        )

      }

      else {

        set_allorders(
          previous => {

            const existing =
              new Set(
                previous.map(
                  item =>
                    String(item.no)
                )
              )


            const newOrders =
              temp.filter(
                item =>
                  !existing.has(
                    String(item.no)
                  )
              )


            return [
              ...previous,
              ...newOrders
            ]

          }
        )

      }


      setFeedListType(
        nextList
      )

      setFeedCursor(
        nextCursor
      )

      setHasMoreOrders(
        hasMore
      )


      if (isInitial) {

        setSpeedStarOrders(
          speedstar_orders
        )

        set_small_orders(
          small_orders
        )

        set_big_orders(
          big_orders
        )

        set_exit_orders(
          exit_orders
        )

      }

      else {

        setSpeedStarOrders(
          previous => [
            ...previous,
            ...speedstar_orders.filter(
              item =>
                !previous.some(
                  old =>
                    String(old.no) ===
                    String(item.no)
                )
            )
          ]
        )


        set_small_orders(
          previous => [
            ...(previous || []),
            ...small_orders.filter(
              item =>
                !(previous || []).some(
                  old =>
                    String(old.no) ===
                    String(item.no)
                )
            )
          ]
        )


        set_big_orders(
          previous => [
            ...previous,
            ...big_orders.filter(
              item =>
                !previous.some(
                  old =>
                    String(old.no) ===
                    String(item.no)
                )
            )
          ]
        )


        set_exit_orders(
          previous => [
            ...previous,
            ...exit_orders.filter(
              item =>
                !previous.some(
                  old =>
                    String(old.no) ===
                    String(item.no)
                )
            )
          ]
        )

      }


      if (isInitial) {

        const currHalvingPhase =
          await contract.methods
            .curr_halvingPhase()
            .call()

      const totalBusiness =
        await contract.methods
          .totalbusiness()
          .call()

        const currHalvingData =
          await contract.methods
            .halving(
              currHalvingPhase
            )
            .call()


        const totalOrder =
          await contract.methods
            .total_order()
            .call()


        setCurrHalvingPhase(
          currHalvingPhase
        )

        setCurrHalvingData(
          currHalvingData
        )

        setTotalOrder(
          totalOrder
        )
        setTotalBusiness(totalBusiness)

        setInitialOrdersLoaded(
          true
        )

      }

    }

    catch (error) {

      console.error(
        "Failed to load marketplace orders:",
        error
      )

    }

    finally {

      setLoadingOrders(
        false
      )

    }

  }


  // ============================================================
  // REFRESH ONE BATCH OF ALREADY LOADED ORDERS
  // ============================================================

  const refreshLoadedOrdersBatch = useCallback(
    async () => {

      if (
        !initialOrdersLoaded ||
        allorders.length === 0 ||
        refreshingOrders ||
        loadingOrders
      ) {
        return
      }


      try {

        setRefreshingOrders(true)


        // const web3 =
        //   new Web3(
        //     new Web3.providers.HttpProvider(
        //       "https://poly.api.pocket.network"
        //     )
        //   )
          const web3 =
          new Web3(
            new Web3.providers.HttpProvider(
              "https://bsc-rpc.publicnode.com"
            )
          )

        const contract =
          new web3.eth.Contract(
            contract_abi,
            contract_address
          )


        // ======================================================
        // GET NEXT 10 LOADED ORDERS
        // ======================================================

        const totalLoaded =
          allorders.length


        let start =
          refreshStartIndex


        // If we reached the end,
        // start again from zero.
        if (
          start >= totalLoaded
        ) {

          start = 0

        }


        const end =
          Math.min(
            start +
            REFRESH_BATCH_SIZE,
            totalLoaded
          )


        const ordersToRefresh =
          allorders.slice(
            start,
            end
          )


        console.log(
          `Refreshing loaded orders ${start + 1}-${end} of ${totalLoaded}`
        )


        // ======================================================
        // FETCH 10 ORDERS IN PARALLEL
        // ======================================================

        const refreshedOrders =
          await Promise.all(
            ordersToRefresh.map(
              async oldOrder => {

                try {

                  const updated =
                    await contract.methods
                      .order(
                        oldOrder.no
                      )
                      .call()


                  /*
                   * Keep the marketplace fields which
                   * are not necessarily part of the
                   * public order getter.
                   *
                   * The updated object overwrites
                   * fields returned by order().
                   */

                  return {
                    ...oldOrder,
                    ...updated,

                    // Keep order number safe
                    no:
                      oldOrder.no
                  }

                }

                catch (error) {

                  console.error(
                    `Failed to refresh order ${oldOrder.no}:`,
                    error
                  )

                  return oldOrder

                }

              }
            )
          )


        // ======================================================
        // UPDATE MAIN MARKETPLACE ARRAY
        // ======================================================

        const refreshedMap =
          new Map(
            refreshedOrders.map(
              item => [
                String(item.no),
                item
              ]
            )
          )


        const updatedAllOrders =
          allorders.map(
            oldOrder =>
              refreshedMap.get(
                String(oldOrder.no)
              ) ||
              oldOrder
          )


        // ======================================================
        // GET CURRENT BLOCK TIME
        // ======================================================

        const latestBlock =
          await web3.eth.getBlock(
            "latest"
          )


        const curr_time =
          Number(
            latestBlock.timestamp
          )


        // ======================================================
        // REBUILD FILTER ARRAYS
        //
        // This is important because an order can change from:
        //
        // Big -> Small
        // Live -> Closed
        // etc.
        // ======================================================

        const latestOrders = []

        const speedstar_orders = []
        const small_orders = []
        const big_orders = []
        const exit_orders = []


        for (
          let i = 0;
          i < updatedAllOrders.length;
          i++
        ) {

          const currentOrder =
            updatedAllOrders[i]


          const remainingAmount =
            BigInt(
              currentOrder.remaining_amount ||
              0
            )


          const choosedTime =
            Number(
              currentOrder.choosed_time ||
              0
            )


          const isUnlocked =
            currentOrder.is_unlocked === true ||
            currentOrder.is_unlocked === "true"


          /*
           * Only keep currently live orders
           * in marketplace arrays.
           */

          if (
            remainingAmount <= 0n ||
            (
              curr_time -
              choosedTime
            ) <= 7200 ||
            !isUnlocked
          ) {

            continue

          }


          latestOrders.push(
            currentOrder
          )


          if (
            BigInt(
              currentOrder.exit_fee ||
              0
            ) > 0n
          ) {

            exit_orders.push(
              currentOrder
            )

          }

          else if (
            BigInt(
              currentOrder.speedstar_time ||
              0
            ) > 0n
          ) {

            speedstar_orders.push(
              currentOrder
            )

          }

          else if (
            remainingAmount <
            100000000000000000000n
          ) {

            small_orders.push(
              currentOrder
            )

          }

          else {

            big_orders.push(
              currentOrder
            )

          }

        }


        // ======================================================
        // UPDATE STATE
        // ======================================================

        set_allorders(
          latestOrders
        )


        setSpeedStarOrders(
          speedstar_orders
        )


        set_small_orders(
          small_orders
        )


        set_big_orders(
          big_orders
        )


        set_exit_orders(
          exit_orders
        )


        // ======================================================
        // MOVE REFRESH POINTER
        // ======================================================

        const nextStart =
          end >= totalLoaded
            ? 0
            : end


        setRefreshStartIndex(
          nextStart
        )


      }

      catch (error) {

        console.error(
          "Marketplace batch refresh failed:",
          error
        )

      }

      finally {

        setRefreshingOrders(
          false
        )

      }

    },

    [
      allorders,
      initialOrdersLoaded,
      refreshingOrders,
      loadingOrders,
      refreshStartIndex
    ]
  )


  // ============================================================
  // REFRESH TIMER
  //
  // Every 20 seconds refresh the NEXT 10 loaded orders.
  // ============================================================

  useEffect(() => {

    if (!initialOrdersLoaded) {
      return
    }


    if (allorders.length === 0) {
      return
    }


    const interval =
      setInterval(
        () => {

          refreshLoadedOrdersBatch()

        },
        REFRESH_INTERVAL
      )


    return () => {

      clearInterval(
        interval
      )

    }

  }, [
    initialOrdersLoaded,
    allorders.length,
    refreshLoadedOrdersBatch
  ])


  // ============================================================
  // RENDER
  // ============================================================

  return (

    <>

      <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-app">

        <Navbar
          onProfileClick={() =>
            setPage(
              p =>
                p === 'profile'
                  ? 'home'
                  : 'profile'
            )
          }
          onNavClick={handleNavClick}
        />


        {page === 'profile' ? (

          <ProfilePage
            totalOrder={totalOrder}
            totalBusiness={totalBusiness}
            totalUsers={totalUsers}
            currHalvingPhase={currHalvingPhase}
            userName={userName}
            boostCharges={boostCharges}
            letterBypassCharges={letterBypassCharges}
            marketDay={marketDay}
            user={user}
            isBlackListed={isBlackListed}
            isSuspended={isSuspended}
            outflowVelocityCheck={outflowVelocityCheck}
            totalSuspension={totalSuspension}
            myCompletedOrders={myCompletedOrders}
            myUnlockedOrders={myUnlockedOrders}
            myLockedOrders={myLockedOrders}
            usdt_balance={usdt_balance}
            my_choosedOrders={myChoosedOrders}
            referral={referral}
            showReviewModal={showReviewModal}
            setShowReviewModal={setShowReviewModal}
            closeReviewModal={closeReviewModal}
            handleReviewLater={handleReviewLater}
            handleReviewSubmit={handleReviewSubmit}
            myLastOrder={myLastOrder}
            refData={refData}
            handlePH={handlePH}
            handle_orders_feed={handle_orders_feed} 
            currTime={currTime}
            CurrHalvingData={CurrHalvingData}
          />

        ) : page === 'faq' ? (

          <FaqPage />

        ) : page === 'school' ? (

          <SchoolPage
            user={user}
          />

        ) : (

          <>

            <HeroStats
              CurrHalvingData={
                CurrHalvingData
              }
              currHalvingPhase={
                currHalvingPhase
              }
              totalBusiness={
                totalBusiness
              }
            />


            <MarketplaceFeed
handle_orders_feed={handle_orders_feed}
              handlePH={handlePH}
              myTeam_orders={myTeam_orders}
              totalOrder={
                totalOrder
              }
              currTime={currTime}

              totalBusiness={
                totalBusiness
              }

              totalUsers={
                totalUsers
              }

              currHalvingPhase={
                currHalvingPhase
              }

              CurrHalvingData={
                CurrHalvingData
              }

              boostCharges={
                boostCharges
              }

              letterBypassCharges={
                letterBypassCharges
              }

              marketDay={
                marketDay
              }

              myLastOrder={
                myLastOrder
              }

              user={
                user
              }

              isBlackListed={
                isBlackListed
              }

              isSuspended={
                isSuspended
              }

              outflowVelocityCheck={
                outflowVelocityCheck
              }

              totalSuspension={
                totalSuspension
              }

              usdt_balance={
                usdt_balance
              }

              allorders={
                allorders
              }

              referral={
                referral
              }
              myLockedOrders={myLockedOrders}

              total_Curr_market_seeking_ph={
                total_Curr_market_seeking_ph
              }

              SpeedStarOrders={
                SpeedStarOrders
              }

              small_orders={
                small_orders
              }

              big_orders={
                big_orders
              }

              exit_orders={
                exit_orders
              }


              // ==================================================
              // INFINITE SCROLL
              // ==================================================

              hasMore={
                hasMoreOrders
              }

              loadingMore={
                loadingOrders
              }

              onLoadMore={
                () =>
                  handle_orders_feed(false)
              }


              // ==================================================
              // REFRESH STATUS
              // ==================================================

              refreshingOrders={
                refreshingOrders
              }

            />

          </>

        )}


        <Footer />


        {showReviewModal &&
          page === 'home' && (

            <ReviewModal
              onClose={
                closeReviewModal
              }
              onLater={
                handleReviewLater
              }
              onReview={
                handleReviewSubmit
              }
            />

          )}

      </div>

    </>

  )

}

