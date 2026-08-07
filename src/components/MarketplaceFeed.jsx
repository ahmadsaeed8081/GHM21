
import {
  useEffect,
  useRef,
  useState
} from 'react'

import FeedCard from './FeedCard'
import filter from '../assets/icons/filter.png'
import Web3 from 'web3'

import {
  contract_address,
  contract_abi
} from "../../src/components/configs/Contracts"


const SearchIcon = () => (

  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >

    <circle
      cx="11"
      cy="11"
      r="8"
    />

    <line
      x1="21"
      y1="21"
      x2="16.65"
      y2="16.65"
    />

  </svg>

)


export default function MarketplaceFeed({

  totalOrder,
  totalBusiness,
  totalUsers,
  currHalvingPhase,
  CurrHalvingData,
  boostCharges,
  letterBypassCharges,
  marketDay,
  user,
  isBlackListed,
  isSuspended,
  outflowVelocityCheck,
  totalSuspension,
  usdt_balance,
  currTime,
  handle_orders_feed,
  allorders,
  myLockedOrders,
  handlePH,
  referral,
  myLastOrder,
  total_Curr_market_seeking_ph,
  myTeam_orders,
  SpeedStarOrders,
  small_orders,
  big_orders,
  exit_orders,

  // ============================================================
  // INFINITE SCROLL
  // ============================================================

  hasMore,
  loadingMore,
  onLoadMore,

  // ============================================================
  // BATCH REFRESH
  // ============================================================

  refreshingOrders

}) {


  const [
    expandedIndex,
    setExpandedIndex
  ] = useState(null)


  const [
    search,
    set_search
  ] = useState(false)


  const [
    inner,
    set_inner
  ] = useState(false)


  const [
    indexer,
    set_indexer
  ] = useState(0)


  const [
    search_add,
    set_search_add
  ] = useState(null)


  const [
    search_orders,
    set_search_orders
  ] = useState([])


  const [
    showFilter,
    setShowFilter
  ] = useState(false)


  const [
    sortBy,
    setSortBy
  ] = useState("latest")


  const [
    display_orders,
    set_display_orders
  ] = useState([])


  // ============================================================
  // INFINITE SCROLL SENTINEL
  // ============================================================

  const loadMoreRef =
    useRef(null)


  const toggleDream =
    (index) => {

      setExpandedIndex(
        previous =>
          previous === index
            ? null
            : index
      )

    }


  // ============================================================
  // FILTER
  // ============================================================

  useEffect(() => {

    if (
      sortBy === "latest"
    ) {

      set_display_orders(
        allorders || []
      )

    }
    else if (
      sortBy === "My_Team"
    ) {

      set_display_orders(
        myTeam_orders || []
      )

    }
    else if (
      sortBy === "Speedstar"
    ) {

      set_display_orders(
        SpeedStarOrders || []
      )

    }

    else if (
      sortBy === "Small"
    ) {

      set_display_orders(
        small_orders || []
      )

    }

    else if (
      sortBy === "Big"
    ) {

      set_display_orders(
        big_orders || []
      )

    }

    else if (
      sortBy === "Exit"
    ) {

      set_display_orders(
        exit_orders || []
      )

    }

  }, [

    sortBy,

    allorders,

    SpeedStarOrders,

    small_orders,

    big_orders,

    exit_orders

  ])


  // ============================================================
  // INFINITE SCROLL
  // ============================================================

  useEffect(() => {

    if (
      !loadMoreRef.current
    ) {
      return
    }


    // Don't paginate while searching
    if (search) {
      return
    }


    // Contract says no more orders
    if (!hasMore) {
      return
    }


    const observer =
      new IntersectionObserver(

        entries => {

          const entry =
            entries[0]


          if (
            entry.isIntersecting &&
            hasMore &&
            !loadingMore
          ) {

            console.log(
              "Reached marketplace end. Loading next batch..."
            )


            if (
              typeof onLoadMore ===
              "function"
            ) {

              onLoadMore()

            }

          }

        },

        {

          root: null,

          /*
           * Keep this reasonably small.
           *
           * The old 500px value could trigger
           * loading before the user really reached
           * the end, especially when only 2 orders
           * were loaded.
           */

          rootMargin:
            "100px",

          threshold:
            0

        }

      )


    observer.observe(
      loadMoreRef.current
    )


    return () => {

      observer.disconnect()

    }


  }, [

    hasMore,
    loadingMore,
    search,
    onLoadMore,

    // Reconnect observer when number
    // of rendered orders changes.
    display_orders.length

  ])


  // ============================================================
  // SEARCH
  // ============================================================

  function handle_Search() {

    let temp = []


    if (
      search_add == null ||
      search_add === ""
    ) {

      return

    }


    const web3 =
      new Web3(
        new Web3.providers.HttpProvider(
          "https://poly.api.pocket.network"
        )
      )


    if (
      !web3.utils.isAddress(
        search_add
      )
    ) {

      alert(
        "Invalid address"
      )

      return

    }


    for (
      let i = 0;
      i < allorders.length;
      i++
    ) {

      if (
        allorders[i].seeker
          ?.toLowerCase() ===
        search_add.toLowerCase()
      ) {

        temp =
          allorders[i]

        set_indexer(
          i
        )

        break

      }

    }


    if (
      temp.length === 0
    ) {

      next()

    }

    else {

      set_search_orders(
        temp
      )

      set_inner(
        true
      )

      set_search(
        true
      )

    }

  }


  async function next() {

    let temp = []

    try {

      const web3 =
        new Web3(
          new Web3.providers.HttpProvider(
            "https://poly.api.pocket.network"
          )
        )


      const contract =
        new web3.eth.Contract(
          contract_abi,
          contract_address
        )


      const all_orders =
        await contract.methods
          .get_userOrders(
            search_add
          )
          .call()


      for (
        let i = 0;
        i < all_orders.length;
        i++
      ) {

        if (
          all_orders[i].is_unlocked 
        ) {

          temp =
            all_orders[i]

          set_indexer(
            0
          )

          break

        }

      }


      if (
        temp.length === 0
      ) {

        alert(
          "There is no Live order for this address"
        )

      }

      else {

        set_search_orders(
          temp
        )

        set_inner(
          false
        )

        set_search(
          true
        )

      }

    }

    catch (error) {

      console.error(
        "Search error:",
        error
      )

      alert(
        "Unable to search this address"
      )

    }

  }


  // ============================================================
  // RENDER
  // ============================================================

  return (

    <section
      className="
        relative z-[1]
        flex-1 px-4 pb-10
        max-nav:px-2.5
        max-nav:pb-8
        max-sm:pb-8
      "
    >

      <div
        className="
          mx-auto flex max-w-7xl
          flex-col gap-2.5
          rounded-3xl
          bg-white/[0.06]
          p-4
          max-lg:px-5
          max-lg:py-3.5
          max-nav:px-3.5
          max-nav:py-3
          max-sm:rounded-xl
          max-sm:px-3
          max-sm:py-2.5
        "
      >


        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            mb-3 flex min-h-16
            flex-wrap items-center
            justify-between
            gap-5
            max-nav:flex-col
            max-nav:items-stretch
            max-nav:gap-3.5
          "
        >

          <div
            className="
              flex flex-col gap-1.5
            "
          >

            <h2
              className="
                font-sans
                text-[28px]
                font-bold
                leading-none
                text-white
                max-sm:text-xl
              "
            >
              Marketplace Feed
            </h2>

          </div>


          <div
            className="
              flex shrink-0
              items-center gap-2.5
              max-nav:w-full
            "
          >


            {/* SEARCH */}

            <div
              className="
                relative flex flex-1
                items-center
                max-nav:flex-1
              "
            >

              <input

                type="text"

                placeholder="Search..."

                className="
                  h-11 w-[280px]
                  rounded-full
                  border
                  border-white/[0.12]
                  bg-white/[0.06]
                  py-2 pr-10 pl-[22px]
                  font-sans text-sm
                  text-gray-300
                  outline-none
                  placeholder:text-gray-400
                  focus:border-white/30
                  max-lg:w-40
                  max-nav:w-full
                "

                value={
                  search_add || ""
                }

                onChange={
                  e =>
                    set_search_add(
                      e.target.value
                    )
                }

              />


              {search_add && (

                <button

                  className="
                    absolute right-3.5
                    z-[1000]
                    flex items-center
                    text-white
                  "

                  onClick={() => {

                    set_search_add(
                      ""
                    )

                    set_search(
                      false
                    )

                    set_inner(
                      false
                    )

                  }}

                >
                  X
                </button>

              )}

            </div>


            <button

              onClick={
                handle_Search
              }

              className="
                flex h-11 w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.18]
                bg-white/[0.06]
                text-white
                hover:border-white/35
              "

            >

              <SearchIcon />

            </button>


            {/* FILTER */}

            <div
              className="
                relative
              "
            >

              <button

                onClick={() =>
                  setShowFilter(
                    !showFilter
                  )
                }

                className="
                  flex h-11 w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.18]
                  bg-white/[0.06]
                  text-white
                "

              >

                <img
                  src={filter}
                  alt="filter"
                  className="h-4 w-5"
                />

              </button>


              {showFilter && (

                <div
                  className="
                    absolute right-0
                    top-14 z-50
                    w-64
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#071018]
                    p-3
                    shadow-2xl
                    backdrop-blur-lg
                  "
                >

                  <p
                    className="
                      mb-3
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-gray-400
                    "
                  >
                    Sort Marketplace
                  </p>


                  {[
                    ["latest", "Latest"],
                    ["My_Team", "My Team"],
                    ["Speedstar", "Speedstars"],
                    ["Exit", "Exit Helps"],
                    ["Small", "Small Helps"],
                    ["Big", "Big Helps"]
                  ].map(
                    ([value, label]) => (

                      <button

                        key={value}

                        onClick={() => {

                          setSortBy(
                            value
                          )

                          setShowFilter(
                            false
                          )

                        }}

                        className={`
                          mb-1 flex w-full
                          items-center
                          rounded-xl
                          px-3 py-2
                          text-left
                          text-sm
                          transition

                          ${
                            sortBy === value
                              ? "bg-teal text-teal-dark"
                              : "text-gray-300 hover:bg-white/10"
                          }
                        `}

                      >
                        {label}
                      </button>

                    )
                  )}


                  <div
                    className="
                      my-2 h-px
                      bg-white/10
                    "
                  />


                  <button

                    onClick={() => {

                      setSortBy(
                        "latest"
                      )

                      setShowFilter(
                        false
                      )

                    }}

                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      px-3 py-2
                      text-left
                      text-sm
                      text-red-400
                      hover:bg-red-500/10
                    "
                  >
                    Reset Filters
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>


        <div
          className="
            mb-5 h-px
            bg-white/[0.08]
          "
        />


        {/* =====================================================
            SEARCH RESULT
        ===================================================== */}

        {search ? (

          <div
            className="
              flex flex-col gap-3.5
            "
          >

            <FeedCard
            handle_orders_feed={handle_orders_feed}
            handlePH={handlePH}
            currTime={currTime}
            myLockedOrders={myLockedOrders}
              CurrHalvingData={
                CurrHalvingData
              }

              boostCharges={
                boostCharges
              }

              user={
                user
              }

              myLastOrder={
                myLastOrder
              }

              isBlackListed={
                isBlackListed
              }

              isSuspended={
                isSuspended
              }

              order={
                search_orders
              }

              allorders={
                allorders
              }

              index={
                indexer
              }

              total_Curr_market_seeking_ph={
                total_Curr_market_seeking_ph
              }

              referral={
                referral
              }

              usdt_balance={
                usdt_balance
              }

              expanded={
                expandedIndex ===
                indexer
              }

              onToggleDream={() =>
                toggleDream(
                  indexer
                )
              }

              search={
                search
              }

              inner={
                inner
              }

            />

          </div>

        ) : (

          <>


            {/* =================================================
                MARKETPLACE ORDERS
            ================================================= */}

            <div
              className="
                flex flex-col gap-3.5
              "
            >

              {display_orders.map(
                (order, index) => (

                  <FeedCard
                  handle_orders_feed={handle_orders_feed}
                  currTime={currTime}
                  myLockedOrders={myLockedOrders}
                  handlePH={handlePH}
                    key={
                      order.no ??
                      order.orderNo ??
                      index
                    }

                    CurrHalvingData={
                      CurrHalvingData
                    }

                    boostCharges={
                      boostCharges
                    }

                    user={
                      user
                    }

                    myLastOrder={
                      myLastOrder
                    }

                    isBlackListed={
                      isBlackListed
                    }

                    isSuspended={
                      isSuspended
                    }

                    order={
                      order
                    }

                    allorders={
                      allorders
                    }

                    index={
                      index
                    }

                    total_Curr_market_seeking_ph={
                      total_Curr_market_seeking_ph
                    }

                    referral={
                      referral
                    }

                    usdt_balance={
                      usdt_balance
                    }

                    expanded={
                      expandedIndex ===
                      index
                    }

                    onToggleDream={() =>
                      toggleDream(
                        index
                      )
                    }

                    search={
                      search
                    }

                    inner={
                      inner
                    }

                  />

                )
              )}

            </div>


            {/* =================================================
                REFRESH INDICATOR
            ================================================= */}

            {refreshingOrders && (

              <div
                className="
                  mt-4 flex
                  items-center
                  justify-center
                  gap-2
                  text-xs
                  text-gray-500
                "
              >

                <div
                  className="
                    h-3.5 w-3.5
                    animate-spin
                    rounded-full
                    border
                    border-white/20
                    border-t-teal
                  "
                />

                Updating marketplace...

              </div>

            )}


            {/* =================================================
                INFINITE SCROLL SENTINEL
            ================================================= */}

            {hasMore && (

              <div

                ref={
                  loadMoreRef
                }

                className="
                  flex
                  min-h-[120px]
                  items-center
                  justify-center
                "

              >

                {loadingMore ? (

                  <div
                    className="
                      flex
                      flex-col
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        h-7 w-7
                        animate-spin
                        rounded-full
                        border-2
                        border-white/20
                        border-t-teal
                      "
                    />

                    <span
                      className="
                        text-sm
                        text-gray-400
                      "
                    >
                      Loading more orders...
                    </span>

                  </div>

                ) : (

                  <span
                    className="
                      text-xs
                      text-gray-500
                    "
                  >
                    Scroll for more
                  </span>

                )}

              </div>

            )}


            {!hasMore &&
              display_orders.length > 0 && (

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    py-8
                  "
                >

                  <span
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    No more orders
                  </span>

                </div>

              )}

          </>

        )}

      </div>

    </section>

  )

}

