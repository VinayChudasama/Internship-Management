enum App_Routes {
  INTERN_BATCH = "/intern-batch",
  INTERN_BATCH_CREATE = "/intern-batch/add/new",
  INTERN_BATCH_EDIT = "/intern-batch/edit/:batchId",
  BATCH_DETAIL = "/batch-details/:batchId/:tabValue",
  MENTOR = "/mentor",
  ROADMAP = "/roadmap",
  ROADMAP_CREATE = "/roadmap/add/new",
  ROADMAP_EDIT = "/roadmap/edit/:id",
  ROADMAP_DETAILS = "/roadmap-details/:roadmapId",
  ROADMAP_DETAILS_CREATE = "/roadmap-details/:roadmapId/add/new",
  ROADMAP_DETAILS_EDIT = "/roadmap-details/:roadmapId/edit/:id",
  TRACKER = "/tracker",
  MENTOR_CREATE = "/mentor/add/new",
  MENTOR_EDIT = "/mentor/edit/:id",
}
export { App_Routes };
