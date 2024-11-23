import React, { useEffect, useState } from 'react'
import { fetchPropertyTypeAPI, fetchPropertyTypesAPI } from '../../api';
import { errorToast } from '../../toast';
import ProjectHeading from '../../components/Titles/ProjectHeading';
import ProjectWrapper from '../../components/ProjectWrapper/ProjectWrapper';
import AdminViewPropertyTypes from '../../components/AdminViewPropertyTypes/AdminViewPropertyTypes';

function ViewPropertyType() {


    return (
        <div className="">
            <ProjectHeading title='View Property Types' />
            <ProjectWrapper>
                <AdminViewPropertyTypes />
            </ProjectWrapper>
        </div>
    )
}

export default ViewPropertyType