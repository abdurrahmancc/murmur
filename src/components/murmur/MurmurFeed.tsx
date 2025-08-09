import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axiosPrivet from '../../hooks/axiosPrivet';
import MurmurFeedItem from './MurmurFeedItem';
import Pagination from '../shared/Pagination';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Loading from '../shared/Loading';

const MurmurFeed = ({ api, murmurRefetch, onRefetched }) => {
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
    const sizeFromUrl = parseInt(searchParams.get('pageSize') || '10', 10);
    const [pageNumber, setPageNumber] = useState(pageFromUrl);
    const [rowsPerPage, setRowsPerPage] = useState(sizeFromUrl);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [startPage, setStartPage] = useState(1);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const { data } = await axiosPrivet.get("/api/user/me");
                setUser(data?.data);
            } catch (error) {
                console.error("User fetch failed", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);


    useEffect(() => {
        setPageNumber(pageFromUrl);
        setRowsPerPage(sizeFromUrl);
    }, [pageFromUrl, sizeFromUrl]);

    const updatePagination = (page, size, searchText = '') => {
        const params = new URLSearchParams();
        params.set('page', page.toString());
        params.set('pageSize', size.toString());
        if (searchText) params.set('Search', searchText);
        navigate(`/?${params.toString()}`);
    };

    const { data, isLoading, refetch } = useQuery(
        ['getmurmurs', pageNumber, rowsPerPage],
        async () => {
            const response = await axiosPrivet.get(api, {
                params: {
                    page: pageNumber,
                    pageSize: rowsPerPage,
                },
            });
            return response;
        },
        { keepPreviousData: true }
    );


    useEffect(() => {
        if (murmurRefetch) {
            refetch().then(() => {
                if (onRefetched) onRefetched();
            });
        }
    }, [murmurRefetch, refetch, onRefetched]);


    const { data: followingData, isLoading: isLoadingFollowing, refetch: followingRefetch } = useQuery(
        ['get-following'],
        async () => {
            const response = await axiosPrivet.get('/api/follow/get-following');
            return response;
        }
    );

    useEffect(() => {
        if (data?.data?.data) {
            const { totalItems, totalPages, startPage = 1, endPage = totalPages } = data.data.data;
            setTotalItems(totalItems);
            setTotalPages(totalPages);
            setStartPage(startPage);
            setEndPage(endPage);
        }
    }, [data]);


    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
        updatePagination(newPage, rowsPerPage);
    };


    const handleRowsPerPageChange = (newRows) => {
        setRowsPerPage(newRows);
        setPageNumber(1);
        updatePagination(1, newRows);
    };

    return (
        <div>
            {isLoading || loading && <Loading />}
            {!isLoading && data?.data?.data?.items.length > 0 && (
                <>
                    {data?.data?.data?.items.map(murmur => (
                        <MurmurFeedItem
                            key={murmur.id}
                            murmur={murmur}
                            refetch={refetch}
                            loginUser={user}
                            followingData={followingData?.data?.data}
                            followingRefetch={followingRefetch}
                        />
                    ))}

                    <Pagination
                        pageNumber={pageNumber}
                        rowsPerPage={rowsPerPage}
                        totalItems={totalItems}
                        totalPages={totalPages}
                        endPage={endPage}
                        startPage={startPage}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </>
            )}
        </div>
    );
};

export default MurmurFeed;
